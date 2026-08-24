import yfinance as yf
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import torch
import numpy as np
import math
import datetime
from model import StockLSTM
from data_loader import get_stock_data

app = FastAPI(title="LSTM Financial Forecaster API")

origins = [
    "https://neural-stock-ai-ten.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = StockLSTM(input_size=15, forecast_horizon=7)
try:
    model.load_state_dict(torch.load('best_model.pth', weights_only=True))
    model.eval()
    print("Best model weights loaded successfully.")
except FileNotFoundError:
    print("Warning: Model weights not found. Run train.py first.")

@app.get("/predict")
def predict_next_day(ticker: str = "AAPL"):
    scaled_features, scaled_target, t_scaler, raw_df = get_stock_data(ticker, "6mo")
    
    stock = yf.Ticker(ticker)
    
    # Safe info fetch with automatic fallback if rate-limited
    try:
        info = stock.info
    except Exception as e:
        print(f"Info fetch warning (rate-limited): {e}")
        try:
            fast = stock.fast_info
            info = {
                "shortName": ticker.upper(),
                "exchange": getattr(fast, "exchange", "N/A"),
                "sector": "Technology",
                "open": getattr(fast, "open", float(raw_df.iloc[-1]['Open'].item())),
                "dayHigh": getattr(fast, "day_high", float(raw_df.iloc[-1]['High'].item())),
                "dayLow": getattr(fast, "day_low", float(raw_df.iloc[-1]['Low'].item())),
                "volume": getattr(fast, "last_volume", int(raw_df.iloc[-1]['Volume'].item()))
            }
        except Exception:
            info = {}

    current_actual = float(raw_df.iloc[-1]['Close'].item())
    
    company_profile = {
        "name": info.get("shortName", ticker.upper()),
        "exchange": info.get("exchange", "N/A"),
        "sector": info.get("sector", "Technology")
    }
    
    stock_summary = {
        "current": round(current_actual, 2),
        "open": round(info.get("open", float(raw_df.iloc[-1]['Open'].item())), 2),
        "high": round(info.get("dayHigh", float(raw_df.iloc[-1]['High'].item())), 2),
        "low": round(info.get("dayLow", float(raw_df.iloc[-1]['Low'].item())), 2),
        "volume": info.get("volume", int(raw_df.iloc[-1]['Volume'].item()))
    }
    
    model_settings = {
        "window": 60,
        "features": 15,
        "epochs": 250,
        "optimizer": "Adam",
        "loss": "MSE Loss",
        "target": "Raw Price"
    }

    formatted_news = []
    try:
        raw_news = stock.news[:3] if hasattr(stock, 'news') else []
        for n in raw_news:
            content = n.get("content", n)
            title = content.get("title")
            
            link = (
                content.get("canonicalUrl", {}).get("url") 
                or content.get("clickThroughUrl", {}).get("url") 
                or content.get("link") 
                or n.get("link")
            )
            
            if title and link:
                formatted_news.append({"title": title, "link": link})
    except Exception as e:
        print(f"News fetch warning: {e}")

    if not formatted_news:
        formatted_news = [
            {
                "title": f"Market Analysis & Outlook for {ticker.upper()}",
                "link": f"https://finance.yahoo.com/quote/{ticker.upper()}/news"
            }
        ]

    chart_data = []
    actuals = []
    predictions = []
    directions_actual = []
    directions_pred = []
    eval_days = 30
    
    # 1-STEP BACKTEST EVALUATION (Historical 30 days)
    for i in range(eval_days, 0, -1):
        end_idx = -i
        start_idx = end_idx - 60
        
        past_window = scaled_features[start_idx:end_idx]
        X_input = torch.tensor(past_window, dtype=torch.float32).unsqueeze(0)
        
        with torch.no_grad():
            pred_scaled_sequence = model(X_input).numpy()[0]
        
        pred_scaled_1day = pred_scaled_sequence[0]
        pred_price = t_scaler.inverse_transform(np.array([[pred_scaled_1day]]))[0][0]
        
        actual_price = float(raw_df.iloc[end_idx]['Close'].item()) 
        prev_actual_price = float(raw_df.iloc[end_idx - 1]['Close'].item())
        date_str = raw_df.index[end_idx].strftime("%b %d")
        
        actuals.append(actual_price)
        predictions.append(pred_price)
        
        directions_actual.append(1 if actual_price > prev_actual_price else 0)
        directions_pred.append(1 if pred_price > prev_actual_price else 0)
        
        chart_data.append({
            "date": date_str,
            "actual_price": round(actual_price, 2),
            "predicted_price": round(float(pred_price), 2)
        })
        
    actuals_np = np.array(actuals)
    preds_np = np.array(predictions)
    
    mse = np.mean((actuals_np - preds_np)**2)
    rmse = math.sqrt(mse)
    mae = np.mean(np.abs(actuals_np - preds_np))
    
    ss_res = np.sum((actuals_np - preds_np)**2)
    ss_tot = np.sum((actuals_np - np.mean(actuals_np))**2)
    r2 = 1 - (ss_res / (ss_tot + 1e-8))
    
    mape = np.mean(np.abs((actuals_np - preds_np) / actuals_np)) * 100
    dir_acc = np.mean(np.array(directions_actual) == np.array(directions_pred)) * 100
    
    residuals = actuals_np - preds_np
    std_dev = np.std(residuals)
    ci_margin = 1.96 * std_dev

    # 7-DAY FUTURE FORECAST
    last_60_days = scaled_features[-60:]
    X_input_future = torch.tensor(last_60_days, dtype=torch.float32).unsqueeze(0)
    
    with torch.no_grad():
        future_scaled = model(X_input_future).numpy()[0]
        
    future_prices = [t_scaler.inverse_transform(np.array([[val]]))[0][0] for val in future_scaled]
    
    last_date = raw_df.index[-1]
    future_forecast_data = []
    
    current_date = last_date
    for price in future_prices:
        current_date += datetime.timedelta(days=1)
        while current_date.weekday() >= 5:
            current_date += datetime.timedelta(days=1)
            
        future_forecast_data.append({
            "date": current_date.strftime("%b %d"),
            "future_prediction": round(float(price), 2),
            "ci_upper": round(float(price + ci_margin), 2),
            "ci_lower": round(float(price - ci_margin), 2)
        })
        
    chart_data.extend(future_forecast_data)
    
    day_7_price = future_prices[-1]
    expected_return = ((day_7_price - current_actual) / current_actual) * 100
    
    if expected_return > 2.0: signal = "STRONG BUY"
    elif expected_return > 0.5: signal = "BUY"
    elif expected_return < -2.0: signal = "STRONG SELL"
    elif expected_return < -0.5: signal = "SELL"
    else: signal = "HOLD"

    latest_indicators = {
        "Current_Price": float(round(current_actual, 2)),
        "RSI": float(round(raw_df.iloc[-1]['RSI_14'].item(), 2)),
        "MACD": float(round(raw_df.iloc[-1]['MACD'].item(), 2)),
        "SMA_30": float(round(raw_df.iloc[-1]['SMA_30'].item(), 2))
    }

    return {
        "ticker": ticker.upper(),
        "signal": signal,
        "expected_return": float(round(expected_return, 2)),
        "is_positive": bool(expected_return > 0),
        "company": company_profile,
        "summary": stock_summary,
        "model_settings": model_settings,
        "news": formatted_news,
        "metrics": {
            "rmse": float(round(rmse, 2)),
            "mae": float(round(mae, 2)),
            "mape": float(round(mape, 2)),
            "r2": float(round(r2, 2)),
            "dir_acc": float(round(dir_acc, 1))
        },
        "indicators": latest_indicators,
        "history": chart_data
    }
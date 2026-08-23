import yfinance as yf
import numpy as np
import pandas as pd
import torch

class CustomScaler:
    def __init__(self):
        self.min_val = None
        self.max_val = None

    def fit_transform(self, data):
        self.min_val = np.min(data, axis=0)
        self.max_val = np.max(data, axis=0)
        return (data - self.min_val) / (self.max_val - self.min_val + 1e-8)

    def inverse_transform(self, data):
        return data * (self.max_val - self.min_val + 1e-8) + self.min_val

def add_technical_indicators(df):
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)

    df['SMA_10'] = df['Close'].rolling(window=10).mean()
    df['SMA_30'] = df['Close'].rolling(window=30).mean()
    df['EMA_20'] = df['Close'].ewm(span=20, adjust=False).mean()
    
    delta = df['Close'].diff()
    up = delta.clip(lower=0)
    down = -1 * delta.clip(upper=0)
    ema_up = up.ewm(com=13, adjust=False).mean()
    ema_down = down.ewm(com=13, adjust=False).mean()
    rs = ema_up / (ema_down + 1e-8)
    df['RSI_14'] = 100 - (100 / (1 + rs))
    
    ema_12 = df['Close'].ewm(span=12, adjust=False).mean()
    ema_26 = df['Close'].ewm(span=26, adjust=False).mean()
    df['MACD'] = ema_12 - ema_26
    
    sma_20 = df['Close'].rolling(window=20).mean()
    std_20 = df['Close'].rolling(window=20).std()
    df['BB_Upper'] = sma_20 + (std_20 * 2)
    df['BB_Lower'] = sma_20 - (std_20 * 2)
    
    df['Daily_Return'] = df['Close'].pct_change()
    df['High_Low_Pct'] = (df['High'] - df['Low']) / (df['Low'] + 1e-8)
    df['Vol_Change_Pct'] = df['Volume'].pct_change()
    
    df.dropna(inplace=True)
    return df

def get_stock_data(ticker="AAPL", period="4y"):
    df = yf.download(ticker, period=period, progress=False)
    
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)
        
    df = add_technical_indicators(df)
    
    feature_cols = [
        'Open', 'High', 'Low', 'Close', 'Volume', 
        'SMA_10', 'SMA_30', 'EMA_20', 'RSI_14', 'MACD', 
        'BB_Upper', 'BB_Lower', 'Daily_Return', 'High_Low_Pct', 'Vol_Change_Pct'
    ]
    
    features = df[feature_cols].values
    target = df[['Close']].values  # TARGET REVERTED TO RAW PRICE
    
    feature_scaler = CustomScaler()
    target_scaler = CustomScaler()
    
    scaled_features = feature_scaler.fit_transform(features)
    scaled_target = target_scaler.fit_transform(target)
    
    return scaled_features, scaled_target, target_scaler, df

def create_sliding_windows(features, target, window_size=60, forecast_horizon=7):
    X, Y = [], []
    for i in range(len(features) - window_size - forecast_horizon + 1):
        X.append(features[i:(i + window_size), :])
        Y.append(target[i + window_size : i + window_size + forecast_horizon, 0])
        
    X = np.array(X)
    Y = np.array(Y)
    
    X_tensor = torch.tensor(X, dtype=torch.float32)
    Y_tensor = torch.tensor(Y, dtype=torch.float32)
    
    return X_tensor, Y_tensor
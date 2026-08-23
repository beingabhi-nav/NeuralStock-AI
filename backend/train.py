import torch
import torch.nn as nn
import json
import datetime
from data_loader import get_stock_data, create_sliding_windows
from model import StockLSTM

def train_model():
    print("1. Fetching 15-feature dataset from Yahoo Finance...")
    scaled_features, scaled_target, _, _ = get_stock_data("AAPL", "4y")
    
    # Using the 60-day window size
    X, Y = create_sliding_windows(scaled_features, scaled_target, window_size=60, forecast_horizon=7)

    # Walk-Forward Validation (chronological split)
    train_size = int(len(X) * 0.8)
    X_train, Y_train = X[:train_size], Y[:train_size]
    X_val, Y_val = X[train_size:], Y[train_size:] 
    
    print("2. Initializing LSTM for 7-Day Forecasting...")
    model = StockLSTM(input_size=15, forecast_horizon=7) 
    criterion = nn.MSELoss() 
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

    epochs = 250
    patience = 30
    best_val_loss = float('inf')
    epochs_no_improve = 0
    best_epoch = 0
    
    print("3. Starting training loop with Early Stopping...")
    for epoch in range(epochs):
        model.train()
        optimizer.zero_grad() 
        
        outputs = model(X_train)
        loss = criterion(outputs, Y_train) 
        
        loss.backward()
        optimizer.step()
        
        # Validation Phase
        model.eval() 
        with torch.no_grad():
            val_outputs = model(X_val)
            val_loss = criterion(val_outputs, Y_val).item()
            
        # Early Stopping Logic
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            epochs_no_improve = 0
            best_epoch = epoch + 1
            # Save the BEST model
            torch.save(model.state_dict(), 'best_model.pth')
        else:
            epochs_no_improve += 1
            
        if (epoch + 1) % 25 == 0:
            print(f'Epoch [{epoch + 1}/{epochs}] | Train Error: {loss.item():.5f} | Val Error: {val_loss:.5f}')
            
        if epochs_no_improve >= patience:
            print(f"Early stopping triggered at epoch {epoch+1}. Best model was at epoch {best_epoch}.")
            break

    print("4. Saving Model Metadata...")
    metadata = {
        "architecture": "LSTM",
        "input_features": 15,
        "window_size": 60,
        "forecast_horizon": 7,
        "target_type": "Raw Price",
        "best_epoch": best_epoch,
        "val_loss_mse": best_val_loss,
        "trained_on": datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    }
    with open('metadata.json', 'w') as f:
        json.dump(metadata, f, indent=4)
        
    print("Training complete. Ready for production.")

if __name__ == "__main__":
    train_model()
import torch.nn as nn

class StockLSTM(nn.Module):
    def __init__(self, input_size=15, hidden_size=64, num_layers=2, forecast_horizon=7):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True, dropout=0.2)
        self.fc = nn.Linear(hidden_size, forecast_horizon)

    def forward(self, x):
        out, _ = self.lstm(x)
        out = self.fc(out[:, -1, :])
        return out
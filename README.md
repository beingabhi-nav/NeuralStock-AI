# NeuralStock AI

**NeuralStock AI** is an intelligent financial forecasting platform that leverages machine learning to predict stock price trajectories. Built with a React frontend and a FastAPI backend, it utilizes Long Short-Term Memory (LSTM) neural networks to analyze historical market data and technical indicators, generating a 7-day forward price forecast with calculated confidence intervals.

## Technology Stack
*   **Frontend:** React.js (Vite), GSAP Animations, Recharts
*   **Backend:** Python, FastAPI, PyTorch (LSTM), Pandas, Scikit-learn
*   **Data Source:** Yahoo Finance (yfinance)

## Prerequisites
Before you begin, ensure you have the following installed on your local machine:
*   **Node.js** (v18 or higher)
*   **Python** (v3.8 or higher)
*   **Git**

## Local Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/beingabhi-nav/NeuralStock-AI.git
cd NeuralStock-AI
```

### 2. Backend Setup (FastAPI & AI Model)

#### Open a terminal and navigate to the backend directory:
```Bash
cd backend
```
#### Create and activate a virtual environment:

Mac/Linux: 
```bash
python3 -m venv venv
```
&&
```bash
source venv/bin/activate
```

Windows: 
```bash
python -m venv venv 
```
&& 
```bash
venv\Scripts\activate
```
#### Install the required dependencies and start the local server:
```Bash
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend API will run on http://localhost:8000.

### 3. Frontend Setup (React & Vite)

#### Open a new terminal window and navigate to the frontend directory:
```Bash
cd frontend
```

#### Install the Node dependencies and start the development server:
```Bash
npm install
npm run dev
```
The interactive dashboard will automatically become available at http://localhost:5173.

### Developed by Abhinav Pandit.

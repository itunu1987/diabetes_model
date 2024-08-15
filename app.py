from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

# Initialize the FastAPI app
app = FastAPI()

# Enable CORS for all domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)


# Load the trained model and scaler
model = joblib.load('diabetes_model_v0.1.pkl')
scaler = joblib.load('scaler.pkl')

# Define a prediction endpoint
@app.post("/predict")
def predict_diabetes(data: dict):
    # Extract the data and convert to a list
    valuesList = list(data.values())
    
    # Convert to 2D array for model input
    input_data = np.array(valuesList).reshape(1, -1)
    
    # Scale the input
    input_data_scaled = scaler.transform(input_data)
    
    # Make a prediction
    prediction = model.predict(input_data_scaled)
    
    # Return the prediction result
    return {"prediction": int(prediction[0])}

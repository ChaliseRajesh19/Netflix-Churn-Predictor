from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

# Load trained pipeline
model = joblib.load("netflix_churn_rf_model.pkl")

app = FastAPI(title="Netflix Churn Prediction API")

class UserInput(BaseModel):
    age: int
    watch_hours: float
    last_login_days: int
    monthly_fee: float
    gender: str
    subscription_type: str
    device: str
    region: str
    favorite_genre: str
    profiles_count: int

# Compute derived features (same as training)
def compute_derived_features(watch_hours, last_login_days, monthly_fee, profiles_count):
    last_login_days = last_login_days if last_login_days != 0 else 1
    engagement_score = watch_hours / last_login_days + 1  # same formula as training
    low_activity_flag = 1 if last_login_days > 30 else 0
    high_fee_flag = 1 if monthly_fee > 13.99 else 0
    multiprofile = 1 if profiles_count > 1 else 0
    return engagement_score, low_activity_flag, high_fee_flag, multiprofile

# Prepare input dataframe
def prepare_input(data: UserInput):
    engagement_score, low_activity_flag, high_fee_flag, multiprofile = compute_derived_features(
        data.watch_hours, data.last_login_days, data.monthly_fee, data.profiles_count
    )

    df = pd.DataFrame([{
        "age": data.age,
        "watch_hours": data.watch_hours,
        "last_login_days": data.last_login_days,
        "monthly_fee": data.monthly_fee,
        "profiles_count": data.profiles_count,
        "gender": data.gender,
        "subscription_type": data.subscription_type,
        "device": data.device,
        "region": data.region,
        "favorite_genre": data.favorite_genre,
        "engagement_score": engagement_score,
        "low_activity_flag": low_activity_flag,
        "high_fee_flag": high_fee_flag,
        "multiprofile": multiprofile
    }])
    return df

@app.post("/predict_churn")
def predict_churn(input_data: UserInput):
    df = prepare_input(input_data)
    prediction = model.predict(df)
    return {"churn_prediction": int(prediction[0])}

# -------------------------------------------------
# IMPORTS
# -------------------------------------------------
from pyexpat import features

from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd
import requests
import shap
import numpy as np
import logging
from logging.handlers import RotatingFileHandler
import os

# -------------------------------------------------
# CONFIGURATION
# -------------------------------------------------
API_KEY = "f5c23276d9b9c26d1ab72119a3ee2980"   # Replace with new secure key

app = Flask(__name__)

# -------------------------------------------------
# LOGGING CONFIGURATION
# -------------------------------------------------
if not os.path.exists('logs'):
    os.mkdir('logs')

file_handler = RotatingFileHandler('logs/app.log', maxBytes=10240000, backupCount=10)
file_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
))
file_handler.setLevel(logging.INFO)
app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)
app.logger.info('AQI Prediction Dashboard Started')

# -------------------------------------------------
# LOAD MODELS
# -------------------------------------------------
rf_reg = joblib.load("models/aqi_xgb_reg_model.pkl")
rf_clf = joblib.load("models/aqi_xgb_clf_model.pkl")
le = joblib.load("models/label_encoder.pkl")


# Initialize SHAP explainer ONCE
explainer = shap.Explainer(rf_reg)

global_predictions_count = 0

feature_columns = ['PM2.5', 'PM10', 'NO2', 'SO2', 'CO', 'O3']

# -------------------------------------------------
# HELPER FUNCTIONS
# -------------------------------------------------

def get_aqi_color(aqi):
    if aqi <= 50:
        return "green"
    elif aqi <= 100:
        return "lightgreen"
    elif aqi <= 150:
        return "yellow"
    elif aqi <= 200:
        return "orange"
    elif aqi <= 300:
        return "red"
    else:
        return "darkred"


def get_health_advisory(aqi):
    if aqi <= 50:
        return {
            "level": "Good",
            "message": "Air quality is satisfactory, and air pollution poses little or no risk.",
            "recommendation": "Enjoy outdoor activities!"
        }
    elif aqi <= 100:
        return {
            "level": "Moderate",
            "message": "Air quality is acceptable for most people.",
            "recommendation": "Sensitive people should limit prolonged outdoor exertion."
        }
    elif aqi <= 150:
        return {
            "level": "Unhealthy for Sensitive Groups",
            "message": "Sensitive groups may experience health effects.",
            "recommendation": "Limit prolonged outdoor exertion."
        }
    elif aqi <= 200:
        return {
            "level": "Unhealthy",
            "message": "Everyone may begin to experience health effects.",
            "recommendation": "Avoid prolonged outdoor exertion."
        }
    elif aqi <= 300:
        return {
            "level": "Very Unhealthy",
            "message": "Health alert: risk of health effects increased.",
            "recommendation": "Avoid outdoor activities."
        }
    else:
        return {
            "level": "Hazardous",
            "message": "Health warning of emergency conditions.",
            "recommendation": "Stay indoors."
        }


def convert_api_scale(index):
    mapping = {
        1: 25,
        2: 75,
        3: 125,
        4: 175,
        5: 250
    }
    return mapping.get(index, None)


# -------------------------------------------------
# ROUTES
# -------------------------------------------------

@app.route("/")
def home():
    app.logger.info("Home page accessed")
    return render_template("landing.html")


@app.route("/predict-page")
def predict_page():
    app.logger.info("Predict page accessed")
    return render_template("predict.html")


@app.route("/city-aqi")
def city_aqi_page():
    app.logger.info("City AQI page accessed")
    return render_template("city_aqi.html")


# -------------------------------------------------
# EXISTING ML PREDICTION (DO NOT REMOVE)
# -------------------------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    global global_predictions_count
    try:
        global_predictions_count += 1
        data = request.json
        app.logger.info(f"Prediction request received with data: {data}")
        df = pd.DataFrame([data], columns=feature_columns)

        aqi = int(rf_reg.predict(df)[0])
        category = le.inverse_transform(rf_clf.predict(df))[0]
        color = get_aqi_color(aqi)
        advisory = get_health_advisory(aqi)

        app.logger.info(f"Prediction successful: AQI={aqi}, Category={category}")
        return jsonify({
            "aqi": aqi,
            "category": category,
            "color": color,
            "advisory": advisory
        })

    except Exception as e:
        app.logger.error(f"Prediction error: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 400


# -------------------------------------------------
# STATS ROUTE
# -------------------------------------------------
@app.route("/api/stats")
def get_stats():
    try:
        df = pd.read_csv("data/city_pollutants.csv")
        cities_monitored = len(df["City"].unique())
        return jsonify({
            "total_predictions": global_predictions_count,
            "cities_monitored": cities_monitored,
            "highest_aqi_city": "Delhi",
            "highest_aqi_value": 348
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------------------------
# STATIC CITY DATA ROUTES (CSV)
# -------------------------------------------------
@app.route("/api/cities")
def get_cities():
    try:
        df = pd.read_csv("data/city_pollutants.csv")
        cities = df["City"].tolist()
        return jsonify(cities)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/city/<city_name>")
def get_city_data(city_name):
    try:
        df = pd.read_csv("data/city_pollutants.csv")
        city_data = df[df["City"].str.lower() == city_name.lower()]

        if city_data.empty:
            return jsonify({"error": "City not found"}), 404

        return jsonify(city_data.iloc[0].to_dict())

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------------------------
# NEW: LIVE API + ML + SHAP COMPARISON
# -------------------------------------------------
@app.route("/api/live-aqi/<city>")
def live_aqi(city):
    global global_predictions_count

    try:
        global_predictions_count += 1
        app.logger.info(f"Live AQI request for city: {city}")
        
        # Step 1: Get Coordinates
        geo_url = f"https://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={API_KEY}"
        geo_data = requests.get(geo_url).json()

        if not geo_data:
            app.logger.warning(f"City not found: {city}")
            return jsonify({"error": "City not found"}), 404

        lat = geo_data[0]['lat']
        lon = geo_data[0]['lon']
        app.logger.info(f"Coordinates found for {city}: lat={lat}, lon={lon}")

        # Step 2: Get Pollution Data
        air_url = f"https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}"
        air_data = requests.get(air_url).json()

        components = air_data["list"][0]["components"]

        # Step 3: Prepare ML Input (CO unit correction)
        live_input = pd.DataFrame([{
            "PM2.5": components["pm2_5"],
            "PM10": components["pm10"],
            "NO2": components["no2"],
            "SO2": components["so2"],
            "CO": components["co"] / 1000,
            "O3": components["o3"]
        }])

        # Step 4: ML Prediction
        ml_aqi = rf_reg.predict(live_input)[0]
        ml_category = le.inverse_transform(rf_clf.predict(live_input))[0]
        app.logger.info(f"ML Prediction for {city}: AQI={ml_aqi}, Category={ml_category}")

        # Step 5: Convert API AQI
        api_index = air_data["list"][0]["main"]["aqi"]
        live_aqi_value = convert_api_scale(api_index)

        # Step 6: SHAP Explainability
        shap_values = explainer.shap_values(live_input)

        feature_impacts = {
            k: float(v) for k, v in zip(live_input.columns, shap_values[0])
        }

        # Step 7: Response
        app.logger.info(f"Live AQI comparison for {city}: ML={ml_aqi}, API={live_aqi_value}")
        return jsonify({
    "city": city,
    "ml_aqi": round(float(ml_aqi), 2),
    "ml_category": str(ml_category),
    "live_aqi": live_aqi_value,
    "difference": round(abs(float(ml_aqi) - live_aqi_value), 2),
    "feature_impacts": feature_impacts,
    "components": components
})

    except Exception as e:
        app.logger.error(f"Live AQI error for {city}: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500
    
# -------------------------------------------------
# AQI TREND (LAST 24 HOURS)
# -------------------------------------------------
@app.route("/api/aqi-trend/<city>")
def aqi_trend(city):

    try:
        app.logger.info(f"AQI trend request for city: {city}")
        
        # Get coordinates
        geo_url = f"https://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={API_KEY}"
        geo_data = requests.get(geo_url, timeout=5).json()

        if not geo_data:
            app.logger.warning(f"City not found for trend: {city}")
            return jsonify({"error": "City not found"}), 404

        lat = geo_data[0]["lat"]
        lon = geo_data[0]["lon"]

        import time

        end_time = int(time.time())
        start_time = end_time - (24 * 60 * 60)

        history_url = f"https://api.openweathermap.org/data/2.5/air_pollution/history?lat={lat}&lon={lon}&start={start_time}&end={end_time}&appid={API_KEY}"

        history_data = requests.get(history_url, timeout=5).json()

        trend = []

        for item in history_data["list"]:

            components = item["components"]

            # Prepare ML input
            ml_input = pd.DataFrame([{
                "PM2.5": components["pm2_5"],
                "PM10": components["pm10"],
                "NO2": components["no2"],
                "SO2": components["so2"],
                "CO": components["co"] / 1000,
                "O3": components["o3"]
            }])

            # ML Prediction
            ml_prediction = rf_reg.predict(ml_input)[0]
            

            # API AQI
            api_index = item["main"]["aqi"]
            api_aqi = convert_api_scale(api_index)

            trend.append({
                "time": item["dt"],
                "live_aqi": api_aqi,
                "ml_aqi": round(float(ml_prediction), 2)
            })

        app.logger.info(f"AQI trend calculated for {city}: {len(trend)} data points")
        return jsonify(trend)

    except Exception as e:
        app.logger.error(f"AQI trend error for {city}: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500

# -------------------------------------------------
# RUN APP
# -------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
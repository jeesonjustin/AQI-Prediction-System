
# AQI Prediction System using XGBoost

An AI-powered Air Quality Index (AQI) prediction and monitoring system developed as an MCA final year project.  
This application predicts AQI levels using Machine Learning models and provides real-time air quality insights through an interactive web dashboard.

---

##  Project Overview

The AQI Prediction System is designed to analyze pollutant data and predict air quality categories and AQI values using XGBoost Machine Learning models.  
The system also integrates live pollution data APIs and visual dashboards for better environmental awareness and decision-making.

---

##  Key Features

- Real-time AQI monitoring
- AQI value prediction using XGBoost Regression
- AQI category classification
- SHAP explainability integration
- Live pollution data integration using OpenWeather API
- Interactive and responsive dashboard
- AQI trend visualization
- Health advisory based on AQI levels
- Comparison between predicted AQI and live AQI
- Clean and modern user interface

---

##  Machine Learning Features

- Data preprocessing and cleaning
- SMOTEENN for handling class imbalance
- XGBoost Regression Model
- XGBoost Classification Model
- Model evaluation and prediction analysis
- SHAP Explainable AI visualization

---

##  Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap

### Backend
- Python
- Flask

### Machine Learning
- XGBoost
- Scikit-learn
- Pandas
- NumPy
- SHAP

### APIs
- OpenWeather Air Pollution API

---

##  Project Structure

```bash
AQI-Prediction-System/
│
├── data/                  # Dataset files
├── logs/                  # Log files
├── models/                # Trained ML models
├── screenshots/           # Project screenshots
├── static/                # CSS, JS, Images
├── templates/             # HTML templates
├── app.py                 # Main Flask application
├── architecture-diagram.png
├── README.md
├── requirements.txt
└── .gitignore
```
---
##  Installation
### Clone the repository

git clone https://github.com/jeesonjustin/AQI-Prediction-System.git

### Navigate to project folder

cd AQI-Prediction-System

### Create virtual environment

python -m venv .venv

### Activate virtual environment

.venv\Scripts\activate

### Install dependencies

pip install -r requirements.txt

###  Run the Project

python app.py

### Open browser and visit:

http://127.0.0.1:5000


---
##  AQI Categories

| AQI Range | Category     |
| --------- | ------------ |
| 0 – 50    | Good         |
| 51 – 100  | Satisfactory |
| 101 – 200 | Moderate     |
| 201 – 300 | Poor         |
| 301 – 400 | Very Poor    |
| 401 – 500 | Severe       |

---
##  UserInterface

![AirAware landing page showing real-time AQI intelligence dashboard with live Delhi AQI prediction, pollutant readings, and AI-powered monitoring features](<screenshots/Hero section- Landing page.png>)

![City-wise AQI comparison dashboard displaying ML predicted AQI, live API AQI, AQI gauge meter, and health risk analysis for selected cities](<screenshots/City wise AQI live_comparison.png>)

![AQI prediction interface allowing users to enter pollutant values including PM2.5, PM10, NO2, SO2, CO, and O3 for AI-based AQI prediction](<screenshots/Check AQI page.png>)

![Interactive 24-hour AQI trend graph comparing live AQI values with machine learning predicted AQI over time](<screenshots/Last 24h AQI trend graph.png>)

![Explainable AI SHAP visualization showing pollutant feature contributions and their impact on AQI prediction results](<screenshots/Explainable AI - SHAP.png>)

---
##  Future Enhancements

- Mobile application integration
- Advanced forecasting models
- User authentication system
- Historical AQI analytics
- Multi-city comparison dashboard

---
## Academic Information

Project Title: AQI-Prediction-System

Course: Master of Computer Applications (MCA)

Institution: SCMS School of Engineering and Technology

University: APJ Abdul Kalam Technological University
---
##  Developed By

Jeeson Justin
MCA Student | UI/UX Designer | Full Stack Developer
- GitHub: https://github.com/jeesonjustin
- LinkedIn: https://linkedin.com/in/jeesonjustin
---


<!-- # AirAware - AI-Powered Air Quality Intelligence Platform

![AirAware Logo](🌬️)

A professional, full-featured air quality monitoring and prediction platform powered by Machine Learning.

## 🌟 Features

- **Professional Landing Page** with hero section, features showcase, and statistics
- **City AQI Search** allowing users to find real-time air quality data for 50+ major cities
- **AI-Powered AQI Prediction** using Random Forest ML models
- **Animated AQI Gauge** with smooth circular progress visualization
- **Health Advisories** based on AQI levels with detailed recommendations
- **Dominant Pollutant Identification** to understand air quality drivers
- **Modern Design** with glassmorphism effects, gradients, and animations
- **Fully Responsive** design for desktop, tablet, and mobile devices
- **Interactive Elements** with smooth scrolling and scroll-triggered animations

## 🚀 Quick Start

### Prerequisites

- Python 3.7+
- Flask
- scikit-learn
- joblib
- pandas

### Installation

1. Navigate to the project directory:
```bash
cd "d:\AQI_Prediction_Dashboard - Copy"
```

2. Install dependencies (if not already installed):
```bash
pip install -r requirements.txt
```

3. Run the Flask application:
```bash
python app.py
```

4. Open your browser and visit:
```
http://127.0.0.1:5000
```

## 📖 Usage

### Landing Page
- Explore the features and learn about AirAware
- Click navigation links for smooth scrolling to different sections
- Click "Check AQI" to access the prediction tool

### AQI Prediction
1. Navigate to the prediction page
2. Enter pollutant values for:
   - PM2.5 (Fine particulate matter in μg/m³)
   - PM10 (Coarse particulate matter in μg/m³)
   - NO2 (Nitrogen dioxide in ppb)
   - SO2 (Sulfur dioxide in ppb)
   - CO (Carbon monoxide in ppm)
   - O3 (Ozone in ppb)
3. Click "Predict AQI"
4. View results with:
   - Animated AQI gauge
   - Air quality category
   - Health advisory
   - Dominant pollutant

### Example Values

**Good Air Quality:**
- PM2.5: 15.0, PM10: 30.0, NO2: 10.0, SO2: 5.0, CO: 0.5, O3: 25.0

**Moderate Air Quality:**
- PM2.5: 45.5, PM10: 85.2, NO2: 35.8, SO2: 20.3, CO: 1.5, O3: 55.7

**Unhealthy Air Quality:**
- PM2.5: 125.0, PM10: 180.0, NO2: 85.0, SO2: 60.0, CO: 8.5, O3: 120.0

## 🎨 Design Features

- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Gradient Backgrounds**: Smooth color transitions
- **Animated Particles**: 30 floating particles in hero section
- **Scroll Animations**: Elements fade in as you scroll
- **Interactive Cards**: Hover effects with elevation changes
- **Animated Counters**: Statistics count up when visible
- **Circular Gauge**: Smooth SVG animation for AQI display

## 📁 Project Structure

```
AQI_Prediction_Dashboard - Copy/
├── app.py                      # Flask application
├── requirements.txt            # Python dependencies
├── models/                     # ML models
│   ├── aqi_reg_model.pkl      # Regression model
│   ├── aqi_clf_model.pkl      # Classification model
│   └── label_encoder.pkl      # Label encoder
├── templates/                  # HTML templates
│   ├── index.html             # Landing page
│   └── predict.html           # Prediction page
└── static/                     # Static assets
    ├── css/
    │   └── style.css          # Comprehensive styling
    ├── js/
    │   └── script.js          # Interactive functionality
    └── images/                # Image assets
```

## 🎯 AQI Categories

| AQI Range | Category | Color | Health Impact |
|-----------|----------|-------|---------------|
| 0-50 | Good | Green | Minimal impact |
| 51-100 | Moderate | Yellow | Acceptable for most |
| 101-150 | Unhealthy for Sensitive Groups | Orange | Sensitive groups affected |
| 151-200 | Unhealthy | Red | Everyone affected |
| 201-300 | Very Unhealthy | Purple | Serious health effects |
| 301+ | Hazardous | Maroon | Emergency conditions |

## 🔧 Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables, Bootstrap 5.3.2
- **Fonts**: Inter (Google Fonts)
- **Icons**: Font Awesome 6.4.0
- **ML Models**: Random Forest (scikit-learn)
- **Data Processing**: pandas

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📄 License

This project is part of an educational demonstration of integrating Machine Learning models into web applications.

## 🙏 Acknowledgments

- CPCB (Central Pollution Control Board) for AQI standards
- Random Forest algorithm for accurate predictions
- Bootstrap and Font Awesome for UI components

---

**Built with ❤️ for environmental intelligence and public health awareness**

🌬️ **AirAware** - Breathe Smarter with AI -->



# AQI Prediction System using XGBoost

An AI-powered Air Quality Index (AQI) prediction and monitoring system developed as an MCA final year project.  
This application predicts AQI levels using Machine Learning models and provides real-time air quality insights through an interactive web dashboard.

---

## 📌 Project Overview

The AQI Prediction System is designed to analyze pollutant data and predict air quality categories and AQI values using XGBoost Machine Learning models.  
The system also integrates live pollution data APIs and visual dashboards for better environmental awareness and decision-making.

---

## 🚀 Key Features

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

## 🧠 Machine Learning Features

- Data preprocessing and cleaning
- SMOTEENN for handling class imbalance
- XGBoost Regression Model
- XGBoost Classification Model
- Model evaluation and prediction analysis
- SHAP Explainable AI visualization

---

## 🛠️ Technology Stack

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

## 📂 Project Structure

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
## ⚙️ Installation
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

### ▶️ Run the Project

python app.py

### Open browser and visit:

http://127.0.0.1:5000


---
## 📊 AQI Categories

| AQI Range | Category     |
| --------- | ------------ |
| 0 – 50    | Good         |
| 51 – 100  | Satisfactory |
| 101 – 200 | Moderate     |
| 201 – 300 | Poor         |
| 301 – 400 | Very Poor    |
| 401 – 500 | Severe       |

---
## 📸 Screenshots

![AirAware landing page showing real-time AQI intelligence dashboard with live Delhi AQI prediction, pollutant readings, and AI-powered monitoring features](<screenshots/Hero section- Landing page.png>)

![City-wise AQI comparison dashboard displaying ML predicted AQI, live API AQI, AQI gauge meter, and health risk analysis for selected cities](<screenshots/City wise AQI live_comparison.png>)

![AQI prediction interface allowing users to enter pollutant values including PM2.5, PM10, NO2, SO2, CO, and O3 for AI-based AQI prediction](<screenshots/Check AQI page.png>)

![Interactive 24-hour AQI trend graph comparing live AQI values with machine learning predicted AQI over time](<screenshots/Last 24h AQI trend graph.png>)

![Explainable AI SHAP visualization showing pollutant feature contributions and their impact on AQI prediction results](<screenshots/Explainable AI - SHAP.png>)

---
## 🔮 Future Enhancements

- Mobile application integration
- Advanced forecasting models
- User authentication system
- Historical AQI analytics
- Multi-city comparison dashboard

---
## 👨‍💻 Author

Jeeson Justin

MCA Final Year Student
UI/UX Designer | Web Developer | ML Enthusiast

---
## 📄 License
This project is developed for educational and academic purposes.
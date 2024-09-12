import pickle
import json
import numpy as np
from flask import Flask, request,render_template, jsonify

app = Flask(__name__)

# Load the trained model
with open('banglore_home_prices_model.pickle', 'rb') as f:
    model = pickle.load(f)

# Load the columns (features)
with open('columns.json', 'r') as f:
    data_columns = json.load(f)['data_columns']

def predict_price(location, sqft, bath, bhk):
    loc_index = -1
    if location.lower() in data_columns:
        loc_index = data_columns.index(location.lower())

    arr = np.zeros(len(data_columns))
    arr[0] = sqft
    arr[1] = bath
    arr[2] = bhk
    if loc_index >= 0:
        arr[loc_index] = 1

    return model.predict([arr])[0]
@app.route("/")
def home():
    return render_template('index.html')
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    location = data['location']
    sqft = float(data['sqft'])
    bath = int(data['bath'])
    bhk = int(data['bhk'])

    predicted_price = predict_price(location, sqft, bath, bhk)

    return jsonify({'prediction': predicted_price})

if __name__ == "__main__":
    app.run(debug=True)

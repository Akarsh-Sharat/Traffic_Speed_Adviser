import importlib
import pandas as pd
from flask import Flask, render_template, request
import pyttsx3

app = Flask(__name__, static_folder='static', template_folder='templates')

engine = pyttsx3.init()



display_text = ""

@app.route('/')
def index():
    return render_template('index.html')

    

@app.route('/update-display-text', methods=['POST'])
def update_display_text():
    global display_text
    data = request.get_json()
    display_text = data['displayText']
    # speed_cal()  # Call the speed_cal function
    return display_text

# def speed_cal():
#     global display_text
#     data = pd.read_csv('training_data.csv')
#     given_speed = display_text  # Current speed
#     time_left = 15  # Time left for the next signal to change

#     # Reshape the input to match the model's expected format
#     input_data = [[given_speed, time_left]]

#     # Load the trained model and predict the speed suggestion
#     model = importlib.import_module('static\speed_model.py')
#     suggested_speed = model.predict(input_data)[0][0]

#     return str(suggested_speed)

    

@app.route('/speak')
def speak_text():
    global display_text
    text = "Next traffic signal: 1.6 Km ahead. " + display_text + " to avoid traffic." 
    engine.setProperty('rate', 120)  # Adjust the speech rate 
    engine.setProperty('voice', 'HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_EN-US_ZIRA_11.0')

    engine.say(text)  
    engine.runAndWait()
    return "Text spoken successfully!"


if __name__ == '__main__':
    app.run()

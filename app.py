from flask import Flask, render_template, request
import pyttsx3

app = Flask(__name__)
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
    return display_text

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

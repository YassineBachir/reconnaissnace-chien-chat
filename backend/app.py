from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from config import Config

# charger le modèle (place-le sous backend/model/)
model = tf.keras.models.load_model('model/chat_chien_model.h5')

app = Flask(__name__)
CORS(app, resources={
    r"/*": {"origins": ["https://catordog1.netlify.app"]}
})


@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    img = Image.open(io.BytesIO(file.read())).convert('RGB').resize((128,128))
    x = np.expand_dims(np.array(img)/255.0,0)
    preds = model.predict(x)[0]
    idx = int(np.argmax(preds))
    labels = ['Chat','Chien']
    return jsonify(prediction=labels[idx], confidence=float(preds[idx]))

@app.route('/config')
def get_config():
    return jsonify({
        "img_width": Config.IMG_WIDTH,
        "img_height": Config.IMG_HEIGHT
    })


#if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000)import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

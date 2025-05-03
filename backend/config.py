import os

class Config:
    # Clé secrète pour Flask (sécurité des sessions)
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev_secret_key'

    # Chemin vers le modèle entraîné
    MODEL_PATH = os.environ.get('MODEL_PATH') or 'model/chat_chien_model.h5'

    # Taille d'image attendue par le modèle
    IMG_HEIGHT = 128
    IMG_WIDTH = 128

    # Autoriser les extensions de fichiers (upload)
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

    # Dossier où seront temporairement stockées les images uploadées
    UPLOAD_FOLDER = 'uploads'

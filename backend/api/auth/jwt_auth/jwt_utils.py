import jwt
from django.conf import settings
from datetime import datetime, timedelta


def generate_jwt_token(user_id):
    expiration_time = datetime.utcnow() + timedelta(seconds=settings.JWT_EXPIRATION)
    payload = {
        'user_id': user_id,
        'exp': expiration_time,
        'iat': datetime.utcnow(),
    }
    token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm='HS256')
    return token


def decode_jwt_token(token):
    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        # Token has expired
        return None
    except jwt.DecodeError:
        # Token is invalid
        return None

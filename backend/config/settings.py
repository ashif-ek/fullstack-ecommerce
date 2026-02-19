# production
from pathlib import Path
from datetime import timedelta
import os
from corsheaders.defaults import default_headers
from dotenv import load_dotenv

# ================================
# LOAD ENV VARIABLES (from .env)
# ================================
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# ================================
# CORE SECURITY
# ================================
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY is missing in environment variables")

DEBUG = os.getenv("DEBUG", "False").lower() == "true"

# Allowed Hosts (comma-separated in .env)
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "").split(",")

# ================================
# INSTALLED APPS
# ================================
INSTALLED_APPS = [
    # Django Default Apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third Party Apps
    "rest_framework",
    "corsheaders",
    "drf_spectacular",
    "django_filters",
    "storages",
    # Local Apps
    "accounts",
    "products",
    "cart",
    "orders",
    "payments",
    "communication",
]

# ================================
# MIDDLEWARE
# ================================
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

# ================================
# TEMPLATES
# ================================
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    }
]

WSGI_APPLICATION = "config.wsgi.application"


# ================================
# DATABASE (PostgreSQL RDS)
# ================================
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST"),
        "PORT": os.getenv("DB_PORT", "5432"),
    }
}


# ================================
# PASSWORD VALIDATION
# ================================
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# ================================
# INTERNATIONALIZATION
# ================================
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True


# ================================
# CUSTOM USER MODEL
# ================================
AUTH_USER_MODEL = "accounts.User"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# ================================
# DJANGO REST FRAMEWORK
# ================================
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 9,
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "100/day",
        "user": "1000/day",
    },
}


# ================================
# JWT SETTINGS
# ================================
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "AUTH_HEADER_TYPES": ("Bearer",),
}


# ================================
# API DOCUMENTATION (Swagger)
# ================================
SPECTACULAR_SETTINGS = {
    "TITLE": "E-Commerce API",
    "DESCRIPTION": "API documentation for the E-Commerce platform",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}


# ================================
# CORS + CSRF SETTINGS
# ================================
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "https://noirel-perfume.vercel.app",
    "https://noirel.duckdns.org",
]

CSRF_TRUSTED_ORIGINS = [
    "https://noirel.duckdns.org",
    "http://localhost:5173",
    "https://noirel-perfume.vercel.app",
]


# ================================
# RAZORPAY
# ================================
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

# ================================
# AWS S3 STORAGE (STATIC + MEDIA)
# ================================
AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")
AWS_REGION = os.getenv("AWS_REGION", "eu-north-1")

if not AWS_STORAGE_BUCKET_NAME:
    raise ValueError("AWS_STORAGE_BUCKET_NAME missing in .env")

# Optional keys (ONLY needed for local dev)
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

# IMPORTANT:
# In production (EC2 IAM Role), these are NOT required.
# boto3 will automatically use the EC2 attached IAM role.

AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com"

AWS_QUERYSTRING_AUTH = False
AWS_DEFAULT_ACL = None

AWS_S3_OBJECT_PARAMETERS = {
    "CacheControl": "max-age=86400",
}
AWS_LOCATION = "media"
MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}/"
STORAGES = {
    "default": {
        "BACKEND": "storages.backends.s3boto3.S3Boto3Storage",
        "OPTIONS": {
            "location": "media",
        },
    },
    "staticfiles": {
        "BACKEND": "storages.backends.s3boto3.S3StaticStorage",
        "OPTIONS": {
            "location": "static",
        },
    },
}


CORS_ALLOW_HEADERS = list(default_headers) + [
    "authorization",
]

CORS_ALLOW_CREDENTIALS = True


# SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
# SECURE_SSL_REDIRECT = True
# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = True


# from pathlib import Path
# from dotenv import load_dotenv
# import os
# from datetime import timedelta

# load_dotenv()

# BASE_DIR = Path(__file__).resolve().parent.parent

# # SECRET_KEY = os.getenv(
# #     "SECRET_KEY", "django-insecure-=#osfo!$!cmyu-qim$w8pq0$!l47_ju15f!gh+ltag2_dsg%)n"
# # )
# SECRET_KEY = os.environ["SECRET_KEY"]
# DEBUG = os.getenv("DEBUG", "False").lower() == "true"
# ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "*").split(",")

# # Application definition
# INSTALLED_APPS = [
#     "django.contrib.admin",
#     "django.contrib.auth",
#     "django.contrib.contenttypes",
#     "django.contrib.sessions",
#     "django.contrib.messages",
#     "django.contrib.staticfiles",
#     "rest_framework",
#     "corsheaders",
#     "drf_spectacular",
#     "accounts",
#     "products",
#     "cart",
#     "orders",
#     "payments",
#     "django_filters",
# ]

# MIDDLEWARE = [
#     "django.middleware.security.SecurityMiddleware",
#     "corsheaders.middleware.CorsMiddleware",
#     "django.contrib.sessions.middleware.SessionMiddleware",
#     "django.middleware.common.CommonMiddleware",
#     "django.middleware.csrf.CsrfViewMiddleware",
#     "django.contrib.auth.middleware.AuthenticationMiddleware",
#     "django.contrib.messages.middleware.MessageMiddleware",
#     "django.middleware.clickjacking.XFrameOptionsMiddleware",
# ]

# CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
#     "http://localhost:3000",
#     "http://127.0.0.1:3000",
# ]

# ROOT_URLCONF = "config.urls"

# TEMPLATES = [
#     {
#         "BACKEND": "django.template.backends.django.DjangoTemplates",
#         "DIRS": [],
#         "APP_DIRS": True,
#         "OPTIONS": {
#             "context_processors": [
#                 "django.template.context_processors.debug",
#                 "django.template.context_processors.request",
#                 "django.contrib.auth.context_processors.auth",
#                 "django.contrib.messages.context_processors.messages",
#             ],
#         },
#     },
# ]

# WSGI_APPLICATION = "config.wsgi.application"

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql",
#         "NAME": os.getenv("DB_NAME"),
#         "USER": os.getenv("DB_USER"),
#         "PASSWORD": os.getenv("DB_PASSWORD"),
#         "HOST": os.getenv("DB_HOST", "localhost"),
#         "PORT": os.getenv("DB_PORT", "5432"),
#     }
# }

# AUTH_PASSWORD_VALIDATORS = [
#     {
#         "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
#     },
#     {
#         "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
#     },
#     {
#         "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
#     },
#     {
#         "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
#     },
# ]

# LANGUAGE_CODE = "en-us"
# TIME_ZONE = "UTC"
# USE_I18N = True
# USE_TZ = True

# STATIC_URL = "static/"

# MEDIA_URL = "/media/"
# MEDIA_ROOT = BASE_DIR / "media"

# DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
# AUTH_USER_MODEL = "accounts.User"

# REST_FRAMEWORK = {
#     "DEFAULT_AUTHENTICATION_CLASSES": (
#         "rest_framework_simplejwt.authentication.JWTAuthentication",
#     ),
#     "DEFAULT_PERMISSION_CLASSES": [
#         "rest_framework.permissions.AllowAny",
#     ],
#     "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
#     "PAGE_SIZE": 9,
#     "DEFAULT_FILTER_BACKENDS": [
#         "django_filters.rest_framework.DjangoFilterBackend",
#         "rest_framework.filters.SearchFilter",
#     ],
#     "SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
# }
# SIMPLE_JWT = {
#     "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
#     "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
#     "ROTATE_REFRESH_TOKENS": False,
#     "BLACKLIST_AFTER_ROTATION": False,
#     "AUTH_HEADER_TYPES": ("Bearer",),
# }


# RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
# RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

# SPECTACULAR_SETTINGS = {
#     "TITLE": "E-Commerce API",
#     "DESCRIPTION": "API documentation for the E-Commerce platform",
#     "VERSION": "1.0.0",
#     "SERVE_INCLUDE_SCHEMA": False,
# }


# #production
# from pathlib import Path
# from datetime import timedelta
# import os

# from dotenv import load_dotenv

# # ================================
# # LOAD ENV VARIABLES (from .env)
# # ================================
# load_dotenv()

# BASE_DIR = Path(__file__).resolve().parent.parent

# # ================================
# # CORE SECURITY
# # ================================
# SECRET_KEY = os.getenv("SECRET_KEY")
# if not SECRET_KEY:
#     raise ValueError("SECRET_KEY is missing in environment variables")

# DEBUG = os.getenv("DEBUG", "False").lower() == "true"

# # Allowed Hosts (comma-separated in .env)
# ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "").split(",")
# if not ALLOWED_HOSTS or ALLOWED_HOSTS == [""]:
#     raise ValueError("ALLOWED_HOSTS is missing in environment variables")


# # ================================
# # INSTALLED APPS
# # ================================
# INSTALLED_APPS = [
#     # Django Default Apps
#     "django.contrib.admin",
#     "django.contrib.auth",
#     "django.contrib.contenttypes",
#     "django.contrib.sessions",
#     "django.contrib.messages",
#     "django.contrib.staticfiles",

#     # Third Party Apps
#     "rest_framework",
#     "corsheaders",
#     "drf_spectacular",
#     "django_filters",
#     "storages",

#     # Local Apps
#     "accounts",
#     "products",
#     "cart",
#     "orders",
#     "payments",
# ]

# # ================================
# # MIDDLEWARE
# # ================================
# MIDDLEWARE = [
#     "corsheaders.middleware.CorsMiddleware",

#     "django.middleware.security.SecurityMiddleware",
#     "django.contrib.sessions.middleware.SessionMiddleware",
#     "django.middleware.common.CommonMiddleware",

#     "django.middleware.csrf.CsrfViewMiddleware",
#     "django.contrib.auth.middleware.AuthenticationMiddleware",

#     "django.contrib.messages.middleware.MessageMiddleware",
#     "django.middleware.clickjacking.XFrameOptionsMiddleware",
# ]

# ROOT_URLCONF = "config.urls"

# # ================================
# # TEMPLATES
# # ================================
# TEMPLATES = [
#     {
#         "BACKEND": "django.template.backends.django.DjangoTemplates",
#         "DIRS": [],
#         "APP_DIRS": True,
#         "OPTIONS": {
#             "context_processors": [
#                 "django.template.context_processors.debug",
#                 "django.template.context_processors.request",
#                 "django.contrib.auth.context_processors.auth",
#                 "django.contrib.messages.context_processors.messages",
#             ],
#         },
#     }
# ]

# WSGI_APPLICATION = "config.wsgi.application"


# # ================================
# # DATABASE (PostgreSQL RDS)
# # ================================
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql",
#         "NAME": os.getenv("DB_NAME"),
#         "USER": os.getenv("DB_USER"),
#         "PASSWORD": os.getenv("DB_PASSWORD"),
#         "HOST": os.getenv("DB_HOST"),
#         "PORT": os.getenv("DB_PORT", "5432"),
#     }
# }


# # ================================
# # PASSWORD VALIDATION
# # ================================
# AUTH_PASSWORD_VALIDATORS = [
#     {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
#     {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
#     {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
#     {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
# ]


# # ================================
# # INTERNATIONALIZATION
# # ================================
# LANGUAGE_CODE = "en-us"
# TIME_ZONE = "UTC"
# USE_I18N = True
# USE_TZ = True


# # ================================
# # CUSTOM USER MODEL
# # ================================
# AUTH_USER_MODEL = "accounts.User"

# DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# # ================================
# # DJANGO REST FRAMEWORK
# # ================================
# REST_FRAMEWORK = {
#     "DEFAULT_AUTHENTICATION_CLASSES": (
#         "rest_framework_simplejwt.authentication.JWTAuthentication",
#     ),

#     "DEFAULT_PERMISSION_CLASSES": [
#         "rest_framework.permissions.AllowAny",
#     ],

#     "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
#     "PAGE_SIZE": 9,

#     "DEFAULT_FILTER_BACKENDS": [
#         "django_filters.rest_framework.DjangoFilterBackend",
#         "rest_framework.filters.SearchFilter",
#     ],

#     "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
# }


# # ================================
# # JWT SETTINGS
# # ================================
# SIMPLE_JWT = {
#     "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
#     "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
#     "AUTH_HEADER_TYPES": ("Bearer",),
# }


# # ================================
# # API DOCUMENTATION (Swagger)
# # ================================
# SPECTACULAR_SETTINGS = {
#     "TITLE": "E-Commerce API",
#     "DESCRIPTION": "API documentation for the E-Commerce platform",
#     "VERSION": "1.0.0",
#     "SERVE_INCLUDE_SCHEMA": False,
# }


# # ================================
# # CORS + CSRF SETTINGS
# # ================================
# CORS_ALLOW_CREDENTIALS = True

# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
#     "http://localhost:3000",
#     "http://127.0.0.1:3000",
#     "https://noirel.duckdns.org",
# ]

# CSRF_TRUSTED_ORIGINS = [
#     "https://noirel.duckdns.org",
#     "http://localhost:5173",
# ]


# # ================================
# # RAZORPAY
# # ================================
# RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
# RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")


# # ================================
# # AWS S3 STORAGE (STATIC + MEDIA)
# # ================================
# AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")
# AWS_REGION = os.getenv("AWS_REGION", "eu-north-1")

# AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
# AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

# if not AWS_STORAGE_BUCKET_NAME:
#     raise ValueError("AWS_STORAGE_BUCKET_NAME missing in .env")

# if not AWS_ACCESS_KEY_ID or not AWS_SECRET_ACCESS_KEY:
#     raise ValueError("AWS credentials missing in .env")


# AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com"

# AWS_QUERYSTRING_AUTH = False
# AWS_DEFAULT_ACL = None

# AWS_S3_OBJECT_PARAMETERS = {
#     "CacheControl": "max-age=86400",
# }


# # ================================
# # DJANGO 4.2+ STORAGE CONFIG (Correct)
# # ================================
# STORAGES = {
#     "default": {
#         "BACKEND": "storages.backends.s3boto3.S3Boto3Storage",
#     },
#     "staticfiles": {
#         "BACKEND": "storages.backends.s3boto3.S3StaticStorage",
#     },
# }


# # ================================
# # STATIC + MEDIA URLS
# # ================================
# MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/media/"
# STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/static/"

# STATIC_ROOT = BASE_DIR / "staticfiles"

# ================================
# LOGGING
# ================================
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "file": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": BASE_DIR / "django.log",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console", "file"],
            "propagate": True,
            "level": "INFO",
        },
        "django.request": {
            "handlers": ["file"],
            "level": "ERROR",
            "propagate": False,
        },
    },
}

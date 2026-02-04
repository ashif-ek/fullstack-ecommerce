from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class User(AbstractUser):
    # Override username to allow spaces and common chars
    username = models.CharField(
        max_length=150,
        unique=True,
        validators=[
            RegexValidator(
                regex=r"^[\w.@+\- ]+$",
                message="Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters and spaces.",
            ),
        ],
        error_messages={
            "unique": "A user with that username already exists.",
        },
    )
    email = models.EmailField(unique=True)
    is_blocked = models.BooleanField(default=False)  # Add this
    created_at = models.DateTimeField(auto_now_add=True)  # Add this

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email

    class Meta:
        ordering = ["-created_at"]

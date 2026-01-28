from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_blocked = models.BooleanField(default=False)  # Add this
    created_at = models.DateTimeField(auto_now_add=True)  # Add this

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    class Meta:
        ordering = ['-created_at']
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UserManager as DefaultUserManager

class UserManager(DefaultUserManager):
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Cannot create user: Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, username=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields = {**extra_fields, "is_staff": True, "is_superuser": True}
        return self.create_user(email, password=password, **extra_fields)

class User(AbstractUser):
    email = models.EmailField(max_length=254, unique=True)
    name = models.CharField(max_length=254)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    objects = UserManager()

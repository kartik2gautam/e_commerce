from django.db import models
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class MyUserManager(BaseUserManager): #user manager to create a user or registering an user
    def create_user(self, email, first_name, password=None,security_question_pet=None ):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")
        user = self.model( # user can register using only these fields 
            email=self.normalize_email(email),
            password=password,
            security_question_pet = security_question_pet,  
            first_name = first_name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user



    def create_superuser(self, email,first_name, password=None): # to create admin 
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            first_name=first_name,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user
    


class MyUser(AbstractBaseUser): # Myuser table in database
    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
   
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    phone_number = models.BigIntegerField(
        null=True
    )
    street_address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.IntegerField(
        null=True
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    security_question_pet = models.CharField(null=True, max_length=30)

    when_created = models.DateTimeField(auto_now_add=True)
    when_updated = models.DateTimeField(auto_now=True)

    objects = MyUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["password","first_name"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin






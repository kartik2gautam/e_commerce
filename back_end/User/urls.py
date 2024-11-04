from django.contrib import admin
from django.urls import path,include
from User.views import UserView,UserLoginView,UserProfile,ChangePassword,PasswordResetEmail,PasswordResetView,Logout,UpdateProfile,ForgetPassword

urlpatterns = [
    path('register/', UserView.as_view(), name= 'register'),
    path('forgetpassword/', ForgetPassword.as_view(), name= 'forget-password'),
    path('login/', UserLoginView.as_view(), name= 'log-in'),
    path('profile/', UserProfile.as_view(), name= 'profile'),
    path('changepassword/', ChangePassword.as_view(), name= 'change-password'),
    path('passwordreset/', PasswordResetEmail.as_view(), name= 'reset-password'),
    path('passwordresetview/<Uid>/<token>/', PasswordResetView.as_view(), name= 'reset-password-view'),
    path('logout/<token>', Logout.as_view(), name= 'log-out'),
    path('updateprofile/', UpdateProfile.as_view(), name= 'update-profile'),
    
]
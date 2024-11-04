from rest_framework import serializers
from User.models import MyUser
from xml.dom import ValidationErr
from django.utils.encoding import smart_str,force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from User.utils import Util

class UserViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields= ['email', 'first_name','password','security_question_pet']
        extra_kwargs={
            'password':{'write_only':True},
            'security_question_pet':{'write_only':True}
            
        }
    def validate(self, attrs):
        password = attrs.get('password')
        return attrs
      
    def create(self, validated_data):
        return MyUser.objects.create_user(**validated_data)   



class UserLoginViewSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = MyUser
        fields= ['email','password']



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model= MyUser
        fields = ['id','first_name', 'last_name', 'phone_number', 'street_address', 'city','state','pincode','is_admin']



class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length = 255, style={'input_type':'password'},write_only= True)
   
    class Meta:
              
        fields = ["password"]      

    def validate(self, attrs):
        password = attrs.get('password')
        user = self.context.get('user')
        user.set_password(password)
        user.save()
        return attrs    




class ForgetPasswordSerializer(serializers.Serializer):

    email = serializers.EmailField()
    security_question_pet = serializers.CharField(max_length=100)
    password = serializers.CharField()
    class Meta:
        fields = ['email', 'security_question_pet', 'password']
        
    def validate(self, data):
        email = data['email']
        security_question_pet = data['security_question_pet']
        
        try:
            user = MyUser.objects.get(email=email) 
        except MyUser.DoesNotExist:
            raise serializers.ValidationError('User not found')
            
        if user.security_question_pet != security_question_pet:
            raise serializers.ValidationError('Invalid pet name')
            
        return data
    


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        fields = ['email']
    def validate(self, attrs):
        email = attrs.get('email')
        if MyUser.objects.filter(email= email).exists():
            user = MyUser.objects.get(email = email)
            Uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            link = 'http://localhost:8000/api/user/reset/'+Uid+ '/'+token
            body = 'Click the link to Reset you password!'+link
            data = {
                'subject': 'Reset your Password',
                'body': body,
                'to_email':user.email
            }
            Util.send_email(data)
            return attrs
        else:
            raise ValidationErr("Provided email doesn't exist")    
         
        

class PasswordResetViewSerializer(serializers.Serializer):
    password = serializers.CharField(max_length = 255, style={'input_type':'password'},write_only= True)
   
    class Meta:       
        fields = ["password"]      
    def validate(self, attrs):
        try:
            password = attrs.get('password')
            Uid = self.context.get('Uid')
            token = self.context.get('token')
            id = smart_str(urlsafe_base64_decode(Uid))
            print('Uid', Uid)
            print('token',token)
            user = MyUser.objects.get(id= id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ValidationErr('Token is expired or wrong !')
            user.set_password(password)
            user.save()
            return attrs    
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user,token)
            raise ValidationErr('Token is expired or wrong ')
        


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['first_name', 'last_name', 'phone_number', 'street_address', 'city','state','pincode']






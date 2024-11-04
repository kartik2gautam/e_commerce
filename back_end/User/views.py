import json
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from User.serializers import UserViewSerializer,UserLoginViewSerializer,UserProfileSerializer,ChangePasswordSerializer,PasswordResetSerializer,PasswordResetViewSerializer,UpdateProfileSerializer, ForgetPasswordSerializer
from User.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework.permissions import IsAuthenticated 
from rest_framework.authtoken.models import Token
from Cart.models import Cart
from Product.models import Product
from .serializers import UserProfileSerializer
from .models import MyUser
from django.contrib.auth import authenticate


#Generating token custom :
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format= None):
        serializer = UserViewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user=  serializer.save()
            # default_product, _ = Product.objects.get_or_create(name="Default Product", price=0, details="Default details", category="Default")
            # Cart.objects.create(user=user,product=default_product, quantity=1,product_name="Default Product")
            token = get_tokens_for_user(user)
            return Response({'token':token,'msg':'Registraion is done!'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,{'msg':'Registraion failed!'}, status=status.HTTP_400_BAD_REQUEST)
    


class UserLoginView(APIView):
    renderer_classes= [UserRenderer]
    def post(self,request,format= None):
        serializer = UserLoginViewSerializer(data = request.data)
        if serializer.is_valid(raise_exception= True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email= email, password = password)
            if user:
                print(user)
                token = get_tokens_for_user(user)
                return Response({'token':token,'msg':'Logged in!'},status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors':["Email or password doesn't match"]}},status=status.HTTP_404_NOT_FOUND)
            



class UserProfile(APIView):
    permission_classes =  [IsAuthenticated]
    def get(self, request, format= None):

        print(request.user)
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class ChangePassword(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        serializer = ChangePasswordSerializer(data=request.data, context = {'user':request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password changed!'},status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PasswordResetEmail(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format = None):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password Reset link is sent. Check your registered email id !'},status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgetPassword(APIView):

    def post(self, request):
        serializer = ForgetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            user = MyUser.objects.get(email=email)
            user.set_password(password)
            user.save()
            
            return Response({'message':'Password changed successfully'})
        
        return Response(serializer.errors, status=400)



class PasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, Uid, token , format = None):
        serializer = PasswordResetViewSerializer(request.data , context = {'Uid':Uid, 'token': token})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Pasword is changed!'},status=status.HTTP_200_OK)



class Logout(APIView):
    def post(self, request, token, format=None,):
        # Ensure the user is authenticated
        
            
                # Retrieve the user's token
                Refresh = RefreshToken(token)
                Refresh.blacklist()
                return Response({'msg': 'User is logged out!'}, status=status.HTTP_200_OK)
            # except Token.DoesNotExist:
            #     return Response({'error': 'User token not found.'}, status=status.HTTP_404_NOT_FOUND)
    
            # # return Response({'error': 'User is not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)








class UpdateProfile(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, format=None):
        
        user = request.user
        serializer = UpdateProfileSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'User Profile updated successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

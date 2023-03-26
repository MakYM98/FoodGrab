from rest_framework import serializers
from .models import *

# For Logging In (Retrieving User data)
class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['name']

class UserSerializer(serializers.ModelSerializer):
    type = TypeSerializer()

    class Meta:
        model = User
        fields = ['user_id','username','email','password','rating','type','img']

# For Retrieving Reviews
class UserReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class ReviewSerializer(serializers.ModelSerializer):
    reviewer_id = UserReviewSerializer()

    class Meta:
        model = Review
        fields = ['review_id','reviewer_id','rating','comment']

# For Listing Page (Retrieving Listing Data)
class UserProductSerializer(serializers.ModelSerializer):
    type = TypeSerializer()

    class Meta:
        model = User
        fields = ['user_id','username','rating','type']

class ProductListingSerializer(serializers.ModelSerializer):
    seller = UserProductSerializer()

    class Meta:
        model = Listing
        fields = ['listing_id','title','description','location','price',
                    'seller','image','date_posted', 'status', 'buyer']

# Get All Unique Locations
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['location']

# Get All Fridges Serializer
class FridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fridges
        fields = ['fridge_id','street','latitude','longitude']

# Get All Chat Serializer
class ChatSerializer(serializers.ModelSerializer):
    sender_id = UserSerializer()
    receiver_id = UserSerializer()
    listing = ProductListingSerializer()

    class Meta:
        model = Chat
        fields = ['chat_id','listing','sender_id','receiver_id', 'interested']

# Get All Messages Serializer
class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    chat = ChatSerializer()

    class Meta:
        model = Messages
        fields = ['message_id','chat','sender','message', 'date_sent']

# Get Follower Serializer
class FollowerSerializer(serializers.ModelSerializer):
    follower = UserSerializer()
    followee = UserSerializer()

    class Meta:
        model = Messages
        fields = ['follower','followee']
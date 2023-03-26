from django.http import HttpResponse
from .models import *
from .serializers import *
from django.db.models import Q
import json
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg
from django.contrib.auth.hashers import make_password, check_password

# For Signing in
@api_view(['GET'])
def user_detail(request, user):
    try:
        user = User.objects.get(user_id=user)
    except User.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
# For Getting ALL listings
@api_view(['GET'])
def listing_detail(request):
    try:
        listing = Listing.objects.filter(status='available').order_by('listing_id')
    except Listing.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = ProductListingSerializer(listing,many=True)
        return Response(serializer.data)

# Get Follower's Listings
@api_view(['GET'])
def listing_following(request):
    user = dict(request.GET)['user'][0]
    try:
        userObj = User.objects.get(user_id=user)
        followings = Following.objects.filter(follower=userObj).values_list('followee')
        listing = Listing.objects.filter(status='available').filter(seller__in=followings).order_by('listing_id')
    except Listing.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = ProductListingSerializer(listing,many=True)
        return Response(serializer.data)

# For Listing Page (Location Filter)
@api_view(['GET'])
def loc_listing_detail(request, count):
    locList = dict(request.GET)['location']
    try:
        listing = Listing.objects.filter(status='available').filter(location__in=locList).order_by('listing_id')
    except Listing.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = ProductListingSerializer(listing,many=True)
        return Response(serializer.data)

# For Getting Unique Locations
@api_view(['GET'])
def location_detail(request):
    try:
        locations = Listing.objects.filter(status='available').values('location').distinct()
    except Listing.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = LocationSerializer(locations,many=True)
        return Response(serializer.data)

# For Registering (Creating Account)
@api_view(['POST'])
def register_api(request):
    params = request.data
    try:
        if(params['type'] == 'Individual'):
            newType = 1
        else:
            newType = 2
        type = Type.objects.get(type_id=newType)
        user = User.objects.create(
            username=params['username'],
            email = params['email'],
            password=make_password(params['password'], 'fyphash',hasher='sha1'),
            type=type,
            img=params['image']
        )
    except User.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'POST':
        return Response()

# Register Form Validation (Checking if Username exists)
@api_view(['GET'])
def register_form_validation(request):
    email = dict(request.GET)['email'][0]
    username = dict(request.GET)['username'][0]
    try:
        combined_queryset = User.objects.all().filter(
            Q(username=username) | Q(email=email)
        )
    except User.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = UserSerializer(combined_queryset,many=True)
        return Response(serializer.data)
    
# For Validating if Username exists (Update Profile Form)
@api_view(['GET'])
def edit_form_validation(request):
    username = dict(request.GET)['username'][0]
    try:
        combined_queryset = User.objects.all().filter(username=username)
    except User.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = UserSerializer(combined_queryset,many=True)
        return Response(serializer.data)

# For Updating User Profile
@api_view(['POST'])
def update_profile_api(request, *args, **kwargs):
    params = request.data
    print(params)
    try:
        user = User.objects.get(user_id=params['user_id'])
        user.username = params['username']
        if(params['type'] == 'Individual'):
            newType = 1
        else:
            newType = 2
        type = Type.objects.get(type_id=newType)
        user.type = type

        if params['image'] != 'undefined' and params['image'] is not None:
            user.img = params['image']

        if params['clear_img'] == 'true':
            user.img = None

        user.save()
    except User.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'POST':
        return Response('Success')

# For Logging In
@api_view(['POST'])
def login_api(request):
    params = json.loads(request.body.decode('utf-8'))
    try:
        user = User.objects.get(
            email=params['email'],
            password=make_password(params['pw'], 'fyphash',hasher='sha1')
        )
    except User.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'POST':
        serializer = UserSerializer(user)
        return Response(serializer.data)

# For Getting Review Scores
@api_view(['GET'])
def review_api(request):
    user_id = dict(request.GET)['user'][0]
    try:
        reviews = Review.objects.all().filter(reviewee_id=int(user_id)).order_by('review_id')[0:3]
    except User.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = ReviewSerializer(reviews,many=True)
        return Response(serializer.data)

# For Getting User's Latest Listing (Profile Page)
@api_view(['GET'])
def user_listing(request):
    user_id = dict(request.GET)['user'][0]
    try:
        listing = Listing.objects.filter(status='available').filter(seller=int(user_id)).order_by('listing_id')[0:3]
    except Listing.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = ProductListingSerializer(listing,many=True)
        return Response(serializer.data)
    
# For Creating a New Listing
@api_view(['POST'])
def create_listing(request, *args, **kwargs):
    # params = json.loads(request.body.decode('utf-8'))
    params = request.data
    date_split = params['date_posted'].split('/')
    new_date = date_split[2] + '-' + date_split[1] + '-' + date_split[0]
    try:
        user = User.objects.get(user_id=params['seller'])
        listing = Listing.objects.create(
            title=params['title'],
            description = params['description'],
            location = params['location'],
            price=params['price'],
            seller=user,
            image=params['image'],
            date_posted=new_date
        )
    except User.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'POST':
        return Response()

# For Getting All Fridge Locations
@api_view(['GET'])
def fridge_api(request):
    try:
        fridge = Fridges.objects.all()
    except Fridges.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = FridgeSerializer(fridge,many=True)
        return Response(serializer.data)

# For Getting All user's chats
@api_view(['GET'])
def all_chat_api(request):
    user_id = dict(request.GET)['user'][0]
    try:
        combined_queryset = Chat.objects.all().filter(Q(sender_id=user_id) | Q(receiver_id=user_id))
    except Chat.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = ChatSerializer(combined_queryset,many=True)
        return Response(serializer.data)

# For Creating a Chat
@api_view(['POST'])
def create_chat(request):
    params = json.loads(request.body.decode('utf-8'))
    try:
        listingObj = Listing.objects.get(listing_id=params['listing'])
        sender = User.objects.get(user_id=params['user'])
        seller = User.objects.get(user_id=params['seller'])

        chat = Chat.objects.create(
            listing = listingObj,
            sender_id = sender,
            receiver_id=seller,
        )
    except User.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'POST':
        return Response()

# For Getting All Messages from a chat
@api_view(['GET'])
def all_message_api(request):
    chat_id = dict(request.GET)['chat'][0]
    try:
        chat = Chat.objects.get(
                chat_id = chat_id
            )
        message = Messages.objects.all().order_by('date_sent').filter(chat=chat)
    except Messages.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = MessageSerializer(message,many=True)
        return Response(serializer.data)

# For Saving a new message
@api_view(['POST'])
def new_message(request):
    params = json.loads(request.body.decode('utf-8'))
    try:
        chat = Chat.objects.get(
                chat_id = params['chat']
            )
        sender = User.objects.get(user_id=params['user'])
        message = Messages.objects.create(
            chat = chat,
            sender = sender,
            message = params['message'],
            date_sent = params['date']
        )
    except Messages.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'POST':
        return Response()
    
# For Retrieving User Details for profile Page
@api_view(['GET'])
def profile_api(request):
    profile_id = dict(request.GET)['user'][0]
    try:
        user = User.objects.get(
                user_id = int(profile_id)
            )
    except Messages.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
# For Update Interest
@api_view(['POST'])
def interest_api(request):
    params = json.loads(request.body.decode('utf-8'))
    try:
        chat = Chat.objects.get(chat_id=params['chat_id'])
        chat.interested = params['interest']
        chat.save()
    except Chat.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'POST':
        return Response('Success')
    
# For Updating List Status 
@api_view(['POST'])
def list_status(request):
    params = json.loads(request.body.decode('utf-8'))
    try:
        buyer = User.objects.get(user_id=params['buyer'])
        listing = Listing.objects.get(listing_id=params['listing_id'])
        listing.status = params['status']
        listing.buyer = buyer
        listing.save()
    except Listing.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'POST':
        return Response('Success')
    
# For Creating a new review
@api_view(['POST'])
def create_review(request):
    params = json.loads(request.body.decode('utf-8'))
    try:
        reviewer = User.objects.get(user_id=params['reviewer'])
        reviewee = User.objects.get(user_id=params['reviewee'])
        review = Review.objects.create(
            reviewer_id = reviewer,
            reviewee_id = reviewee,
            rating = params['rating'],
            comment = params['comment']
        )

        review_score = Review.objects.filter(
            reviewee_id = reviewee).aggregate(Avg('rating')
        )
        reviewee.rating = review_score['rating__avg']
        reviewee.save()
        if params['user'] == 'Buyer':
            chat = Chat.objects.get(chat_id=params['chat_id'])
            chat.buyer_reviewed = True
            chat.save()
        elif params['user'] == 'Seller':
            chat = Chat.objects.get(chat_id=params['chat_id'])
            chat.seller_reviewed = True
            chat.save()

        if chat.buyer_reviewed == True and chat.seller_reviewed == True:
            chat.interested = 'reviewed'
            chat.save()

    except Review.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'POST':
        return Response('Success')
    
# For Following Users
@api_view(['POST'])
def follow_api(request):
    params = json.loads(request.body.decode('utf-8'))
    try:
        follower = User.objects.get(user_id=params['follower'])
        followee = User.objects.get(user_id=params['followee'])
        if params['follow']:
            following = Following.objects.create(
                follower = follower,
                followee = followee
            )
        else:
            unfollow = Following.objects.filter(
                follower = follower,
                followee = followee
            ).delete()
            
    except Listing.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'POST':
        return Response('Success')

# For Checking User following another User
@api_view(['GET'])
def check_follow(request):
    follower_param = dict(request.GET)['follower'][0]
    followee_param = dict(request.GET)['followee'][0]
    try:
        follower = User.objects.get(
                user_id = int(follower_param)
            )
        followee = User.objects.get(
                user_id = int(followee_param)
            )
        following = Following.objects.filter(
                follower = follower,
                followee = followee
            )
    except Messages.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        return Response(len(following))
    
# For Deleting Listing
@api_view(['POST'])
def delete_listing(request):
    params = json.loads(request.body.decode('utf-8'))
    try:
        listing = Listing.objects.filter(
            listing_id = params['listing_id']
        ).delete()
    except User.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'POST':
        return Response('Deleted')
    
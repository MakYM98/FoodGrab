from django.test import TestCase
from .models import *
import json
import datetime
from rest_framework.test import APIRequestFactory
from rest_framework.test import APITestCase
from django.urls import reverse
from django.urls import reverse_lazy


def create_models():
    Type.objects.create(name="Test Type")
    test_type = Type.objects.get(name="Test Type")

    User.objects.create(
        username="TestUser",
        email="testuser@gmail.com",
        password="testpassword",
        rating="5",
        type = test_type
    )
    user_one = User.objects.get(username="TestUser")
    User.objects.create(
        username="TestUser2",
        email="testuser2@gmail.com",
        password="testpassword",
        type=test_type
    )
    user_two = User.objects.get(username="TestUser2")
    Review.objects.create(
        reviewer_id=user_two,
        reviewee_id=user_one,
        rating=5,
        comment="Good"
    )
    Listing.objects.create(
        title="Test Listing",
        description="Test Description",
        location="Test Location",
        price=1.99,
        seller=user_one,
        date_posted = '2023-03-12'
    )
    listing_one = Listing.objects.get(listing_id=1)
    Chat.objects.create(
        listing = listing_one,
        sender_id = user_one,
        receiver_id = user_two,
    )
    chat_one = Chat.objects.get(chat_id=1)
    Messages.objects.create(
        chat = chat_one,
        sender = user_one,
        message = 'Test Message',
        date_sent = '2023-03-12'
    )
    Fridges.objects.create(
        street = 'Test Street',
        latitude = 123.2,
        longitude = 345.2
    )
    Following.objects.create(
        follower = user_one,
        followee = user_two
    )

# Model Test Cases
class ModelTestCase(TestCase):
    def setUp(self):
        create_models()
        # Get Type
        self.test_type = Type.objects.get(name="Test Type")
        # Get User One
        self.user_one = User.objects.get(username="TestUser")
        # Get User Two
        self.user_two = User.objects.get(username="TestUser2")
        # Get Review Object
        self.review_one = Review.objects.get(review_id=1)
        # Get Listing Object
        self.listing_one = Listing.objects.get(listing_id=1)
        # Get Chat Object
        self.chat_one = Chat.objects.get(chat_id=1)
        # Get Message Object        
        self.message_one = Messages.objects.get(message_id=1)
        # Get Fridge Object
        self.fridge_one = Fridges.objects.get(fridge_id=1)
        # Get Following Object
        self.following_one = Following.objects.get(id=1)
    # To ensure that the User object is created with the correct values.
    def test_user_attributes(self):
        self.assertEqual(self.user_one.username, 'TestUser')
        self.assertEqual(self.user_one.email, 'testuser@gmail.com')
        self.assertEqual(self.user_one.password, 'testpassword')
        self.assertEqual(self.user_one.rating, 5)
        self.assertEqual(self.user_one.type.name, 'Test Type')
    # To ensure that the Review object is created with the correct values
    def test_review_attributes(self):
        self.assertEqual(self.review_one.reviewer_id.username, 'TestUser2')
        self.assertEqual(self.review_one.reviewee_id.username, 'TestUser')
        self.assertEqual(self.review_one.rating, 5)
        self.assertEqual(self.review_one.comment, 'Good')
    # To ensure that the Listing object is created with the correct values
    def test_listing_attributes(self):
        self.assertEqual(self.listing_one.title, 'Test Listing')
        self.assertEqual(self.listing_one.description, 'Test Description')
        self.assertEqual(self.listing_one.location, 'Test Location')
        self.assertEqual(self.listing_one.price, 1.99)
        self.assertEqual(self.listing_one.seller.username, 'TestUser')
        self.assertEqual(self.listing_one.date_posted, datetime.date(2023, 3, 12))
    # To ensure that the Chat object is created with the correct values
    def test_chat_attributes(self):
        self.assertEqual(self.chat_one.listing.title, 'Test Listing')
        self.assertEqual(self.chat_one.sender_id.username, 'TestUser')
        self.assertEqual(self.chat_one.receiver_id.username, 'TestUser2')
    # To ensure that the Message object is created with the correct values
    def test_message_attributes(self):
        self.assertEqual(self.message_one.chat.listing.title, 'Test Listing')
        self.assertEqual(self.message_one.sender.username, 'TestUser')
        self.assertEqual(self.message_one.message, 'Test Message')
        self.assertEqual(self.message_one.date_sent, datetime.datetime(2023, 3, 12, 0, 0,  tzinfo=datetime.timezone.utc))
    # To ensure that the Fridge object is created with the correct values
    def test_fridge_attributes(self):
        self.assertEqual(self.fridge_one.street, 'Test Street')
        self.assertEqual(self.fridge_one.latitude, 123.2)
        self.assertEqual(self.fridge_one.longitude, 345.2)
    # To ensure that the Following object is created with the correct values
    def test_following_attributes(self):
        self.assertEqual(self.following_one.follower.username, 'TestUser')
        self.assertEqual(self.following_one.followee.username, 'TestUser2')

# Test Cases for API
class APITest(APITestCase):
    organism1 = None
    good_url = ''
    bad_url = ''

    def setUp(self):
        create_models()
        # Get Type
        self.test_type = Type.objects.get(name="Test Type")
        # Get User One
        self.user_one = User.objects.get(username="TestUser")
        # Get User Two
        self.user_two = User.objects.get(username="TestUser2")
        # Get Review Object
        self.review_one = Review.objects.get(review_id=1)
        # Get Listing Object
        self.listing_one = Listing.objects.get(listing_id=1)
        # Get Chat Object
        self.chat_one = Chat.objects.get(chat_id=1)
        # Get Message Object        
        self.message_one = Messages.objects.get(message_id=1)
        # Get Fridge Object
        self.fridge_one = Fridges.objects.get(fridge_id=1)
        # Get Following Object
        self.following_one = Following.objects.get(id=1)

    def tearDown(self):
        pass

    # Test for user_detail url
    # Check that the status code is 200 (Successful) when given correct id
    def test_user_detail_return_sucess(self):
        self.good_url = reverse('user_details',kwargs={'user': 1})
        response = self.client.get(self.good_url, format='json')
        response.render()
        self.assertEqual(response.status_code, 200)
    # Check that the status code is 200 (Failed) when given incorrect id 
    def test_user_detail_return_failed(self):
        self.good_url = reverse('user_details',kwargs={'user': 3})
        response = self.client.get(self.good_url, format='json')
        self.assertEqual(response.status_code, 404)
    # Check that data returned contains correct key
    def test_user_detail_return_correct_fields(self):
        self.good_url = reverse('user_details',kwargs={'user': 1})
        response = self.client.get(self.good_url, format='json')
        response.render()
        data = json.loads(response.content)
        self.assertEqual(set(data.keys()), set([
            'user_id','username', 'email','password','rating','type','img'
        ]))
    
    # Test for listing_detail url
    # Check that the status code is 200 (Successful)
    def test_listing_detail_return_sucess(self):
        self.good_url = reverse('listing_detail')
        response = self.client.get(self.good_url, format='json')
        response.render()
        self.assertEqual(response.status_code, 200)
    # Check that data returned contains correct key
    def test_user_detail_return_correct_fields(self):
        self.good_url = reverse('listing_detail')
        response = self.client.get(self.good_url, format='json')
        response.render()
        data = json.loads(response.content)
        self.assertEqual(len(data),1)
        data = data[0]
        self.assertEqual(set(data.keys()), set([
            'location','status', 'title','seller','listing_id','image','buyer',
            'description','price','date_posted'
        ]))
    # Test for location_detail url
    # Check that the status code is 200 (Successful)
    def test_location_detail_return_sucess(self):
        self.good_url = reverse('location_detail')
        response = self.client.get(self.good_url, 
                                   content_type='application/json')
        response.render()
        self.assertEqual(response.status_code, 200)
    # Check that only unique locations is returned
    def test_location_detail_return_correct_fields(self):
        self.good_url = reverse('location_detail')
        response = self.client.get(self.good_url, 
                                   content_type='application/json')
        response.render()
        data = json.loads(response.content)[0]['location']
        self.assertEqual(data, 'Test Location')
    # Check that register form validation works
    def test_register_form_validation_return_correct_status(self):
        self.good_url = reverse('register_form_validation')
        response = self.client.get(self.good_url, 
                                   content_type='application/json',
                                   data={
                                    'username':'TestUser',
                                    'email':'testuser@gmail.com'
                                   })
        response.render()
        self.assertEqual(response.status_code, 200)

    # Check that data returned contains correct key
    def test_register_form_validation_return_correct_fields(self):
        self.good_url = reverse('register_form_validation')
        response = self.client.get(self.good_url, 
                                   content_type='application/json',
                                   data={
                                    'username':'TestUser',
                                    'email':'testuser@gmail.com'
                                   })
        response.render()
        data = json.loads(response.content)[0]
        self.assertEqual(set(data.keys()), set([
            'user_id','username', 'email','password','rating','type','img'
        ]))
    # Check that data returned contains correct key
    def test_edit_form_validation_return_correct_fields(self):
        self.good_url = reverse('edit_form_validation')
        response = self.client.get(self.good_url, 
                                   content_type='application/json',
                                   data={
                                    'username':'TestUser',
                                   })
        response.render()
        data = json.loads(response.content)[0]
        self.assertEqual(set(data.keys()), set([
            'user_id','username', 'email','password','rating','type','img'
        ]))
    # Check that the status code is 200 (Successful) 
    def test_review_api_return_correct_status(self):
        self.good_url = reverse('review_api')
        response = self.client.get(self.good_url, 
                                   content_type='application/json',
                                   data={
                                    'user':1,
                                   })
        response.render()
        self.assertEqual(response.status_code, 200)
    # Check that api contains correct key
    def test_review_api_return_correct_fields(self):
        self.good_url = reverse('review_api')
        response = self.client.get(self.good_url, 
                                   content_type='application/json',
                                   data={
                                    'user':1,
                                   })
        response.render()
        data = json.loads(response.content)[0]
        self.assertEqual(set(data.keys()), set([
            'reviewer_id','comment', 'review_id', 'rating'
        ]))
    # Check that the status code is 200 (Successful) 
    def test_user_listing_return_correct_status(self):
        self.good_url = reverse('user_listing')
        response = self.client.get(self.good_url, 
                                   content_type='application/json',
                                   data={
                                    'user':1,
                                   })
        response.render()
        self.assertEqual(response.status_code, 200)
    # Check that api contains correct key
    def test_user_listing_return_correct_fields(self):
        self.good_url = reverse('user_listing')
        response = self.client.get(self.good_url, 
                                   content_type='application/json',
                                   data={
                                    'user':1,
                                   })
        response.render()
        data = json.loads(response.content)[0]
        self.assertEqual(set(data.keys()), set([
            'location','status', 'title','seller','listing_id','image','buyer',
            'description','price','date_posted'
        ]))
    # Check that the status code is 200 (Successful) 
    def test_fridge_api_return_correct_status(self):
        self.good_url = reverse('fridge_api')
        response = self.client.get(self.good_url)
        response.render()
        self.assertEqual(response.status_code, 200)
    # Check that api contains correct key
    def test_fridge_api_return_correct_fields(self):
        self.good_url = reverse('fridge_api')
        response = self.client.get(self.good_url)
        response.render()
        data = json.loads(response.content)[0]
        self.assertEqual(set(data.keys()), set([
            'latitude','street', 'fridge_id','longitude'
        ]))

    # Check that the status code is 200 (Successful) 
    def test_all_chat_api_return_correct_status(self):
        self.good_url = reverse('all_chat_api')
        response = self.client.get(self.good_url,
                                   content_type='application/json',
                                   data={
                                    'user':1,
                                   })
        response.render()
        self.assertEqual(response.status_code, 200)
    # Check that api contains correct key
    def test_all_chat_api_return_correct_fields(self):
        self.good_url = reverse('all_chat_api')
        response = self.client.get(self.good_url,
                                   content_type='application/json',
                                   data={
                                    'user':1,
                                   })
        response.render()
        data = json.loads(response.content)[0]
        self.assertEqual(set(data.keys()), set([
            'sender_id','receiver_id', 'chat_id','interested','listing'
        ]))
    
    # Check that the status code is 200 (Successful) 
    def test_all_message_api_return_correct_status(self):
        self.good_url = reverse('all_message_api')
        response = self.client.get(self.good_url,
                                   content_type='application/json',
                                   data={
                                    'chat':1,
                                   })
        response.render()
        self.assertEqual(response.status_code, 200)
    # Check that api contains correct key
    def test_all_message_api_return_correct_fields(self):
        self.good_url = reverse('all_message_api')
        response = self.client.get(self.good_url,
                                   content_type='application/json',
                                   data={
                                    'chat':1,
                                   })
        response.render()
        data = json.loads(response.content)[0]
        self.assertEqual(set(data.keys()), set([
            'sender','message', 'message_id','chat','date_sent'
        ]))
    
    # Check that the status code is 200 (Successful) 
    def test_profile_api_return_correct_status(self):
        self.good_url = reverse('profile_api')
        response = self.client.get(self.good_url,
                                   content_type='application/json',
                                   data={
                                    'user':1,
                                   })
        response.render()
        self.assertEqual(response.status_code, 200)
    # Check that api contains correct key
    def test_profile_api_return_correct_fields(self):
        self.good_url = reverse('profile_api')
        response = self.client.get(self.good_url,
                                   content_type='application/json',
                                   data={
                                    'user':1,
                                   })
        response.render()
        data = json.loads(response.content)
        self.assertEqual(set(data.keys()), set([
            'rating','user_id', 'type','email','password','username','img'
        ]))

    # Check that the status code is 200 (Successful) 
    def test_check_follow_return_correct_status(self):
        self.good_url = reverse('check_follow')
        response = self.client.get(self.good_url,
                                   content_type='application/json',
                                   data={
                                    'follower':1,
                                    'followee':2
                                   })
        response.render()
        self.assertEqual(response.status_code, 200)
    # Check that api resturns correct number of follows
    def test_check_follow_return_correct_fields(self):
        self.good_url = reverse('check_follow')
        response = self.client.get(self.good_url,
                                   content_type='application/json',
                                   data={
                                    'follower':1,
                                    'followee':2
                                   })
        response.render()
        data = json.loads(response.content)
        # print(data)
        self.assertEqual(data, 1)
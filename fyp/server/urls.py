from django.urls import path
from . import views
from . import api
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # For Signing In
    path('api/user/<int:user>',api.user_detail,name='user_details'),
    # For Retrieving Products (All Listings)
    path('api/listing',api.listing_detail,name='listing_detail'),
    # For Retrieving Products (Following Listings)
    path('api/listing_following',api.listing_following,name='listing_following'),
    # For Retrieving Products (Filtered based on Loc)
    path('api/listing/loc/<int:count>',api.loc_listing_detail,name='loc_listing_detail'),
    # For Retrieving All Locations
    path('api/locations',api.location_detail,name='location_detail'),
    # For Registering
    path('api/register',api.register_api,name='register_api'),
    # For Validating Form
    path('api/form_validation',api.register_form_validation,name='register_form_validation'),
    # For Logging In
    path('api/login',api.login_api,name='login_api'),
    # For Getting Review Score
    path('api/review',api.review_api,name='review_api'),
    # For Getting User's Latest Listing (Profile Page)
    path('api/user_listing',api.user_listing,name='user_listing'),
    # For Creating New Listing
    path('api/create',api.create_listing,name='create_listing'),
    # For Deleting Listing
    path('api/delete',api.delete_listing,name='delete_listing'),
    # For Getting All Fridge Locations
    path('api/fridges',api.fridge_api,name='fridge_api'),
    # For Getting All Fridge Locations
    path('api/chats',api.all_chat_api,name='all_chat_api'),
     # For Getting All Fridge Locations
    path('api/create_chat',api.create_chat,name='create_chat'),
     # For Getting All Messages
    path('api/all_messages',api.all_message_api,name='all_message_api'),
     # For New Messages
    path('api/new_message',api.new_message,name='new_message'),
    # For Profile Details
    path('api/profile',api.profile_api,name='profile_api'),
    # For Validating Update Profile Form
    path('api/edit_profile',api.edit_form_validation,name='edit_form_validation'),
    # For Update Profile
    path('api/update_profile',api.update_profile_api,name='update_profile_api'),
    # For Update Interest
    path('api/interested',api.interest_api,name='interest_api'),
    # For Update Listing Status
    path('api/list_status',api.list_status,name='list_status'),
    # For Creating Review
    path('api/create_review',api.create_review,name='create_review'),
    # For Following User
    path('api/follow',api.follow_api,name='follow_api'),
    # For Creating Review
    path('api/check_follow',api.check_follow,name='check_follow'),
]

# urlpatterns += static(settings.STATIC_URL)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
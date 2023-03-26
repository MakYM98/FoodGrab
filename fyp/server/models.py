from django.db import models

# Account Type Model
class Type(models.Model):
    type_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, null=False,
                               blank=False)
# User Account Model
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20, null=False,
                               blank=False)
    email = models.CharField(max_length=256, null=False,
                               blank=False)
    password = models.CharField(max_length=256, null=False,
                               blank=False)
    rating = models.FloatField(null=True)
    type = models.ForeignKey(Type,on_delete=models.DO_NOTHING)
    img = models.ImageField(upload_to='profile_images',null=True)
# User Review Model
class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    reviewer_id = models.ForeignKey(User,
                                    related_name="Reviewer",
                                    on_delete=models.CASCADE)
    reviewee_id = models.ForeignKey(User,
                                    related_name="Reviewee",
                                    on_delete=models.CASCADE)
    rating = models.FloatField()
    comment = models.CharField(max_length=512, null=False,
                               blank=False)
# Food Listing Model
class Listing(models.Model):
    listing_id = models.AutoField(primary_key=True)
    title =  models.CharField(max_length=256, null=False,
                               blank=False)
    description = models.CharField(max_length=256, null=False,
                               blank=False)
    location =  models.CharField(max_length=256, null=False,
                               blank=False)
    price =  models.FloatField()
    seller = models.ForeignKey(User,
                                    related_name="Seller",
                                    on_delete=models.CASCADE)
    date_posted = models.DateField()
    status =  models.CharField(max_length=20, null=False,
                               blank=False, default="available")
    buyer = models.ForeignKey(User,
                                    related_name="Buyer",
                                    on_delete=models.CASCADE, null=True,
                                    blank=True)
    image = models.ImageField(upload_to='post_images')
# Chat Model
class Chat(models.Model):
    chat_id = models.AutoField(primary_key=True)
    listing = models.ForeignKey(Listing,on_delete=models.DO_NOTHING, blank=True,
                                null=True)
    sender_id = models.ForeignKey(User,
                                    related_name="Sender",
                                    on_delete=models.CASCADE)
    receiver_id = models.ForeignKey(User,
                                    related_name="Receiver",
                                    on_delete=models.CASCADE)
    interested = models.CharField(max_length=256, null=True,
                               blank=True)
    seller_reviewed = models.BooleanField(null=True,
                               blank=True)
    buyer_reviewed = models.BooleanField(null=True,
                               blank=True)
# Message Model
class Messages(models.Model):
    message_id = models.AutoField(primary_key=True)
    chat = models.ForeignKey(Chat,on_delete=models.DO_NOTHING)
    sender = models.ForeignKey(User,on_delete=models.DO_NOTHING)
    message = models.CharField(max_length=512, null=False,
                               blank=False)
    date_sent = models.DateTimeField(blank=True,null=True)

# Fridge Model
class Fridges(models.Model):
    fridge_id = models.AutoField(primary_key=True)
    street = models.CharField(max_length=256, null=False,
                               blank=False)
    latitude = models.FloatField()
    longitude = models.FloatField()
# Following Model
class Following(models.Model):
    follower = models.ForeignKey(User,
                                related_name="UserWhoIsFollowing",
                                on_delete=models.DO_NOTHING)
    followee = models.ForeignKey(User,
                                related_name="UserWhoIsFollowed",
                                on_delete=models.DO_NOTHING) 
import os
import sys
import django
import csv
from collections import defaultdict
from django.contrib.auth.hashers import make_password

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(BASE_DIR)
os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'fyp.settings')
django.setup()

from server.models import *

type_file = f'{BASE_DIR}/fyp/data/type.csv'
fridge_file = f'{BASE_DIR}/fyp/data/fridge.csv'

type = defaultdict(dict)
fridge = defaultdict(dict)

type_list = []
user_list = []

with open(type_file) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        type_obj = Type.objects.create(
            name = row[0]
        )
        type_list.append(type_obj)
    type_obj.save()

with open(fridge_file,mode='r', encoding='utf-8-sig') as csv_file:
    csv_reader = csv.reader(csv_file,delimiter=',')
    for row in csv_reader:
        fridge_obj = Fridges.objects.create(
            street = row[0],
            latitude = row[1],
            longitude = row[2]
        )
    fridge_obj.save()
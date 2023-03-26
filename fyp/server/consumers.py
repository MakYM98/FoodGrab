import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    # Connect user to WebSocket
    async def connect(self): 
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Connect to the Redis server
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
    # Disconnect from WebSocket
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive Data from User
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
        username = text_data_json['sender']
        message = text_data_json['text']

        #send message to the chat room
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'chat_message',
                'message':message,
                'sender':username
            }
        )

    async def chat_message(self, event):
        message = event['message']
        username = event['sender']

        await self.send(text_data=json.dumps({
            'message':message,
            'username':username
        }))

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import server.routing

# the websocket will open at 127.0.0.1:8000/ws/<room_name>
# application = ProtocolTypeRouter({
#     'websocket':
#         URLRouter(
#             websocket_urlpatterns
#         )
#     ,
# })

application = ProtocolTypeRouter({
    'websocket' : AuthMiddlewareStack(URLRouter(server.routing.websocket_urlpatterns))
})
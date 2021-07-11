import os
import time
from stream import Stream
from dotenv import load_dotenv; load_dotenv()

token = os.getenv("token")

client = Bot()
client.run(token)
import os
import time
from stream import Stream
from dotenv import load_dotenv; load_dotenv()

token = os.getenv("token")
guild_id = 859818307870523452
channel_id = 859818307870523456

s = Stream(token, guild_id, channel_id)
s.load_video("./tmp/video")
s.open_guild()
s.join()
s.start()
s.play()

time.sleep(20)

s.pause()
s.stop()
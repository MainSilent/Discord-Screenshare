import os
import time
from stream import Stream
from dotenv import load_dotenv; load_dotenv()

token = os.getenv("token")
s = Stream(token)
s.guild_id = 859818307870523452
s.channel_id = 859818307870523456
s.load_video('./tmp/video')
s.open_guild()
s.join()
s.start()
s.play()

time.sleep(99999)
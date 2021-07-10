import time
from stream import Stream

guild_id = 578558255392096256
channel_id = 851816501543567360

s = Stream(guild_id, channel_id, False)
s.load_video("./video.mp4")
s.open_guild()
s.join()
s.start()

time.sleep(9999999)
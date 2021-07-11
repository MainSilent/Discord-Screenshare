import time
from stream import Stream

token = "ODU2OTAwOTcxMTg3NjY2OTU0.YNHxug.BWxBwke26nhAI2kCMu0c-6JGBYs"
guild_id = 578558255392096256
channel_id = 839833383756365834

s = Stream(token, guild_id, channel_id)
s.load_video("./tmp/video")
s.open_guild()
s.join()
s.start()
s.play()

time.sleep(20)

s.pause()
s.stop()
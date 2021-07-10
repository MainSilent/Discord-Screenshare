from stream import Stream

guild_id = 578558255392096256
channel_id = 839833386796711957

s = Stream(guild_id, channel_id)
s.join()
s.start()

time.sleep(9999999)
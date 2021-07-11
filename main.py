import time
from stream import Stream

guild_id = 578558255392096256
channel_id = 839833381366005790

s = Stream(guild_id, channel_id)
s.load_video("https://dl234.dlmate31.xyz/?file=M3R4SUNiN3JsOHJ6WWQ3aTdPRFA4NW1rRVJIOG50MEt1WjV4NlJreEY2cENwOFlBMGVLcElNQk9JdXc1eEk2bkhwQlo1V3FlZDltSE5UQ1p0NHd1SHpiVDBjOHlyQ3ZhOFl0bEMrOThSa0s5eWNEMzAyTlFrRlg0Zjh6SVc3dFpZRHcyNkVsdDNTZXN3dmpHcnhUMnNrS2lvVXVLYnkwTHZnUWROUEhWL3FCWitFYnFOdkd5Z0pSZG5Cbk9zc0laeXI2UXBGV3d4cW91c2M1d1NrMTVkczBNajhpZ2hxZWE5UmRCeG9vS2gxNnkvZz09")
s.open_guild()
s.join()
s.start()
s.play()

time.sleep(20)

s.pause()
s.stop()
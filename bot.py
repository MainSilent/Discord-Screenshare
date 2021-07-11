import discord

class Bot(discord.Client):
	async def on_ready(self):
		print(self.http.token)
		print('Logged on as', self.user)







# token = os.getenv("token")
# guild_id = 859818307870523452
# channel_id = 859818307870523456

# s = Stream(token, guild_id, channel_id)
# s.load_video("./tmp/video")
# s.open_guild()
# s.join()
# s.start()
# s.play()

# time.sleep(20)

# s.pause()
# s.stop()
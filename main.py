import os
import time
import discord
from stream import Stream
from discord.ext import commands
from dotenv import load_dotenv; load_dotenv()

token = os.getenv("token")
bot = commands.Bot(command_prefix='*')

@bot.event
async def on_ready():
	print('Ready')

bot.run(token)






# s = Stream(token, guild_id, channel_id)
# s.load_video("./tmp/video")
# s.open_guild()
# s.join()
# s.start()
# s.play()

# time.sleep(20)

# s.pause()
# s.stop()
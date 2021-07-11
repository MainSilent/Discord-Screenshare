import os
import time
import discord
from stream import Stream
from threading import Thread
from discord.ext import commands
from dotenv import load_dotenv; load_dotenv()
from concurrent.futures import ThreadPoolExecutor

token = os.getenv("token")
s = Stream(token)
bot = commands.Bot(command_prefix='*')

@bot.event
async def on_ready():
	print('Bot Ready')

@bot.command()
async def p(ctx):
	if s.in_progress:
		return await ctx.send('Another session is already in progress')
	s.in_progress = True

	voice = ctx.message.author.voice
	if ctx.message.author.voice is None:
		return await ctx.send('You need to be in a voice channel to use this command')

	s.guild_id = ctx.guild.id
	s.channel_id = voice.channel.id
	url = ctx.message.content.split()[1]

	Thread(target=s.load_video, args=(url,)).start()

bot.run(token)

# s.open_guild(),
# s.join()
# s.start()
# s.play()
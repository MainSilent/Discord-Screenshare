import undetected_chromedriver as uc
uc.install()

import os
import time
from selenium.webdriver import Chrome, ChromeOptions

class Video:
	def load_video(self, url):
		print("Loading video...")
		self.driver.execute_script(f"video.src='{url}'")
		
		# Wait until video load
		while not self.driver.execute_script("return video.readyState > 0"):
			time.sleep(0.05)

		self.duration = self.driver.execute_script("return video.duration")

	def play(self):
		print("Play")
		self.driver.execute_script("video.play()")

	def pause(self):
		print("Pause")
		self.driver.execute_script("video.pause()")

	def current(self, time=None):
		if time:
			self.driver.execute_script(f"video.currentTime = {time}")
		else:
			return self.driver.execute_script("return video.currentTime")

class Stream(Video):
	client_url = f"file://{os.getcwd()}/client/index.html"

	def __init__(self, guild_id, channel_id, headless=True):
		self.guild_id = guild_id
		self.channel_id = channel_id

		# Open index page
		options = ChromeOptions()
		options.add_argument('--headless') if headless else None
		options.add_argument('--no-sandbox')
		options.add_argument('--window-size=1920,1080')
		options.add_argument('--disable-web-security')
		options.add_argument('--disable-dev-shm-usage')
		options.add_argument('-–allow-file-access-from-files')
		options.add_argument('--autoplay-policy=no-user-gesture-required')
		self.driver = Chrome(executable_path="./chromedriver", options=options)
		print("Opening page...")
		self.driver.get(self.client_url)

	def open_guild(self):
		print("Opening guild...")
		while True:
			try:
				self.driver.execute_script(f'document.querySelector(\'[data-list-item-id="guildsnav___{self.guild_id}"]\').click()')
				break
			except:
				time.sleep(0.1)

	def is_full(self):
		if self.driver.execute_script(f'return document.querySelector("[aria-label=\'Channel is full\']")'):
			return True
		return False

	def is_locked(self):
		if self.driver.execute_script(f'return document.querySelector("[data-list-item-id=\'channels___{self.channel_id}\']").innerHTML.includes("Voice (Locked)")'):
			return True
		return False

	def scroll(self):
		self.driver.execute_script('''
			var c_inject = document.getElementById("channels");
			if( c_inject.scrollTop === (c_inject.scrollHeight - c_inject.offsetHeight))
				c_inject.scroll(0, 0)
			else
				c_inject.scroll(0, c_inject.scrollTop + 250)
		''')

	def join(self):
		print("Joining voice channel...")
		while True:
			try:
				self.scroll()

				if self.is_locked():
					print("Channel is locked")
					break

				self.driver.execute_script(f'document.querySelector("[data-list-item-id=\'channels___{self.channel_id}\']").click()')

				if self.is_full():	
					print("Channel is full")
					break

				print("Joined")
				break
			except:
				time.sleep(0.01)  

	def start(self):
		while True:
			try:
				self.driver.execute_script('document.querySelector(\'[aria-label="Share Your Screen"]\').click()')
				break
			except:
				time.sleep(0.1)

	def stop(self):
		self.driver.close()
		self.driver.quit()

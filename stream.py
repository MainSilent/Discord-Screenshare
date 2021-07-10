import undetected_chromedriver as uc
uc.install()

import os
import time
from selenium.webdriver import Chrome, ChromeOptions

class Stream:
	client_url = f"file://{os.getcwd()}/client/index.html"

	def __init__(self, guild_id, channel_id):
		self.guild_id = guild_id
		self.channel_id = channel_id

		# Open index page
		options = ChromeOptions()
		options.add_argument('--headless')
		options.add_argument('--no-sandbox')
		options.add_argument('--disable-web-security')
		options.add_argument('--disable-dev-shm-usage')
		options.add_argument('-–allow-file-access-from-files')
		options.add_argument('--autoplay-policy=no-user-gesture-required')
		driver = Chrome(executable_path="./chromedriver", options=options)
		print("Opening page...")
		driver.get(self.client_url)

	def load_video(self, url):
		print("Loading video...")
		driver.execute_script(f"video.src='{url}'")

	def open_guild(self):
		print("Opening guild...")
		while True:
		    try:
		        driver.execute_script(f'document.querySelector(\'[data-list-item-id="guildsnav___{self.guild_id}"]\').click()')
		        break
		    except:
		        time.sleep(0.1)


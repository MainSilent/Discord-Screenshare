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
		self.driver = Chrome(executable_path="./chromedriver", options=options)
		print("Opening page...")
		driver.get(self.client_url)

	def load_video(self, url):
		print("Loading video...")
		self.driver.execute_script(f"video.src='{url}'")

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
    	if self.driver.execute_script(f'return document.querySelector("[data-list-item-id=\'channels___{channel_id}\']").innerHTML.includes("Voice (Locked)")'):
            return True
        return False

    def scroll(self):
    	self.driver.execute_script('''
            var c_inject = document.getElementById("channels");
            if( c_inject.scrollTop === (c_inject.scrollHeight - c_inject.offsetHeight))
                c_inject.scroll(0, 0)
            else
                c_inject.scroll(0, c_inject.scrollTop + 1000)
        ''')

    def join(self):
    	print("Joining voice channel...")
		while True:
		    try:

		        driver.execute_script(f'document.querySelector("[data-list-item-id=\'channels___{channel_id}\']").click()')

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

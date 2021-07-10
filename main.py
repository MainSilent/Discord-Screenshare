import undetected_chromedriver as uc
uc.install()

import os
import time
from selenium.webdriver import Chrome, ChromeOptions

url = f"file://{os.getcwd()}/index.html"
channel_id = 859818307870523456
video_path = "./video.mp4"

# Open index page
options = ChromeOptions()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-web-security')
options.add_argument('-–allow-file-access-from-files')
options.add_argument('--autoplay-policy=no-user-gesture-required')
driver = Chrome(executable_path="./chromedriver", options=options)
driver.get(url)

# Load video
driver.execute_script(f"video.src='{video_path}'")

# Join voice channel
while True:
    try:
        driver.execute_script('document.getElementsByClassName("acronym-2mOFsV")[0].click()')
        driver.execute_script(f'document.querySelector("[data-list-item-id=\'channels___{channel_id}\']").click()')
        break
    except:
        time.sleep(0.1)
        
# Start Streaming
while True:
    try:
        driver.execute_script('document.querySelector(\'[aria-label="Share Your Screen"]\').click()')
        break
    except:
        time.sleep(0.1)

time.sleep(9999999)
import os
import time
from selenium.webdriver import Chrome, ChromeOptions

url = f"file://{os.getcwd()}/index.html"
video_path = "./video.mp4"

# Open index page
options = ChromeOptions()
options.add_argument('--no-sandbox')
options.add_argument('--disable-web-security')
options.add_argument('-–allow-file-access-from-files')
options.add_argument('--autoplay-policy=no-user-gesture-required')
driver = Chrome(executable_path="./chromedriver", options=options)
driver.get(url)

# Load video
driver.execute_script(f"video.src='{video_path}'")

# Start Streaming

time.sleep(9999999)
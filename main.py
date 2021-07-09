import time
from selenium.webdriver import Chrome, ChromeOptions

url = "http://127.0.0.1:5500"
video_path = "./video.mp4"

# Open index page
options = ChromeOptions()
options.add_argument('--disable-web-security')
options.add_argument('-–allow-file-access-from-files')
options.add_argument('--autoplay-policy=no-user-gesture-required')
driver = Chrome(executable_path="./chromedriver", options=options)
driver.get(url)

# Load video
driver.execute_script(f"video.src='{video_path}'")

time.sleep(9999999)
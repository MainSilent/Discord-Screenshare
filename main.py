import os
import time
import json
import gzip
from bs4 import BeautifulSoup
from selenium.webdriver import Chrome, ChromeOptions

url = "http://127.0.0.1:5500"
video_path = "./video.mp4"

options = ChromeOptions()
options.add_argument('--disable-web-security')
options.add_argument('-–allow-file-access-from-files')
driver = Chrome(executable_path="./chromedriver", options=options)
driver.get(url)

time.sleep(9999999)
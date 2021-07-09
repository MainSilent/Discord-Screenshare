import os
import time
import json
import gzip
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
from seleniumwire.undetected_chromedriver import Chrome

url = "http://127.0.0.1:5500"

def response_interceptor(request, response):
  ...
	#print(request.url)

options = Options()
options.add_argument('--disable-web-security')
options.add_argument('-–allow-file-access-from-files')
driver = Chrome(executable_path="./chromedriver", chrome_options=options)
driver.response_interceptor = response_interceptor
driver.get(url)

time.sleep(9999999)
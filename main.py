import os
import time
import json
import gzip
from selenium.webdriver.chrome.options import Options
from seleniumwire.undetected_chromedriver import Chrome

token = '""'

def response_interceptor(request, response):
	print(request)

options = Options()
driver = Chrome(executable_path="./chromedriver", options=options)
driver.request_interceptor = request_interceptor
driver.response_interceptor = response_interceptor
driver.get('https://discord.com')
time.sleep(9999999)
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
driver.response_interceptor = response_interceptor
driver.get('https://discord.com')

# Set Token
token_script = f"""
function getLocalStoragePropertyDescriptor() {{
  const iframe = document.createElement('iframe');
  document.head.append(iframe);
  const pd = Object.getOwnPropertyDescriptor(iframe.contentWindow, 'localStorage');
  iframe.remove();
  return pd;
}}
Object.defineProperty(window, 'localStorage', getLocalStoragePropertyDescriptor());
const localStorage = getLocalStoragePropertyDescriptor().get.call(window);	
localStorage.setItem("token", '{token}')
"""
driver.execute_script(token_script)
driver.get("https://discord.com/channels/@me")

time.sleep(9999999)
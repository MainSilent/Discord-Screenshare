import os
import time
import json
import gzip
from selenium.webdriver.chrome.options import Options
from seleniumwire.undetected_chromedriver import Chrome

token = '""'

def response_interceptor(request, response):
	if "a9a865842245be0e7de5" in request.url.split('/')[-1]:
		print(response.body)

options = { 'disable_encoding': True }
driver = Chrome(executable_path="./chromedriver", seleniumwire_options=options)
driver.response_interceptor = response_interceptor
driver.get('https://discord.com/login')

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
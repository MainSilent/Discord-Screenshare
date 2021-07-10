guild_id = 578558255392096256
channel_id = 863407782316081202









# Join voice channel
print("Joining voice channel...")
while True:
    try:

        driver.execute_script(f'document.querySelector("[data-list-item-id=\'channels___{channel_id}\']").click()')

        break
    except:
        time.sleep(0.01)       

time.sleep(9999999)
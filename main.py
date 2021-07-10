guild_id = 578558255392096256
channel_id = 863407782316081202





# Load video
print("Loading video...")
driver.execute_script(f"video.src='{video_path}'")

# Open guild
print("Opening guild...")
while True:
    try:
        driver.execute_script(f'document.querySelector(\'[data-list-item-id="guildsnav___{guild_id}"]\').click()')
        break
    except:
        time.sleep(0.1)

# Join voice channel
print("Joining voice channel...")
while True:
    try:
        # Scroll until find the voice channel
        driver.execute_script('''
            var c_inject = document.getElementById("channels");
            if( c_inject.scrollTop === (c_inject.scrollHeight - c_inject.offsetHeight))
                c_inject.scroll(0, 0)
            else
                c_inject.scroll(0, c_inject.scrollTop + 1000)
        ''')

        # Locked
        if driver.execute_script(f'return document.querySelector("[data-list-item-id=\'channels___{channel_id}\']").innerHTML.includes("Voice (Locked)")'):
            print("Channel is locked")
            break

        driver.execute_script(f'document.querySelector("[data-list-item-id=\'channels___{channel_id}\']").click()')
        
        # Full
        if driver.execute_script(f'return document.querySelector("[aria-label=\'Channel is full\']")'):
            print("Channel is full")
            break

        print("Joined") 
        break
    except:
        time.sleep(0.01)       

# Start Streaming
while True:
    try:
        driver.execute_script('document.querySelector(\'[aria-label="Share Your Screen"]\').click()')
        break
    except:
        time.sleep(0.1)

time.sleep(9999999)
FROM ubuntu:20.04

# Install dependencies
RUN apt-get update
RUN apt-get install -y curl git unzip wget
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install tzdata
RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs
RUN npm i -g yarn

# Clone Repo
RUN git clone https://github.com/MainSilent/Discord-Screenshare.git
WORKDIR Discord-Screenshare
RUN yarn install
COPY .env .

# Download updated ClientUserSettingManager.js file
RUN wget https://raw.githubusercontent.com/aiko-chan-ai/discord.js-selfbot-v13/3ec6bf45fba5cfcde4c70062302d68bfa5ef4cf6/src/managers/ClientUserSettingManager.js -O /Discord-Screenshare/node_modules/discord.js-selfbot-v13/src/managers/ClientUserSettingManager.js

# Install chrome 88
RUN wget http://mirror.cs.uchicago.edu/google-chrome/pool/main/g/google-chrome-stable/google-chrome-stable_88.0.4324.96-1_amd64.deb
RUN apt-get install -y ./google-chrome-stable_88.0.4324.96-1_amd64.deb

# Install chromedriver 88
RUN wget https://chromedriver.storage.googleapis.com/88.0.4324.27/chromedriver_linux64.zip
RUN unzip chromedriver_linux64.zip
RUN mv chromedriver /bin

# Start Bot
RUN yarn start

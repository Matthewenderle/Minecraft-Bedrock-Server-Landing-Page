# Minecraft Bedrock - Server Setup

This is the process I use to setup a MC Bedrock server on a fresh Ubuntu 22.04 (LTS) server.

## Update the server

```bash
sudo apt update
# install needed applications - Hit Enter for any screens that appear
sudo apt install curl wget unzip grep screen openssl -y

wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb -O libssl1.1.deb
sudo dpkg -i libssl1.1.deb
rm libssl1.1.deb
```

## Setting up the Server User

```bash
# Create a user account that we will use to run the minecraft server.
sudo useradd -m mcserver

# Set a password for the mcserver user
sudo passwd mcserver

# Add the user to your currently signed in user
sudo usermod -a -G mcserver $USER

# Log out of your terminal/SSH and relog in
logout
```

## Setting up the MC Bedrock Server

```bash
# Create a directory for the server
sudo mkdir -p /home/mcserver/minecraft_bedrock

# Prepare the download url
DOWNLOAD_URL=$(curl -H "Accept-Encoding: identity" -H "Accept-Language: en" -s -L -A "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; BEDROCK-UPDATER)" https://minecraft.net/en-us/download/server/bedrock/ |  grep -o 'https://minecraft.azureedge.net/bin-linux/[^"]*')

# Download and unzip the server files
sudo wget $DOWNLOAD_URL -O /home/mcserver/minecraft_bedrock/bedrock-server.zip

sudo unzip /home/mcserver/minecraft_bedrock/bedrock-server.zip -d /home/mcserver/minecraft_bedrock/

# Remove the downloaded archive
sudo rm /home/mcserver/minecraft_bedrock/bedrock-server.zip

# Set the owner of the files
sudo chown -R mcserver: /home/mcserver/
```

## Configuring the Server

You can either edit the `server.properties` file in nano, or use a client like Bitvise to download and use Notepad++ to edit them.

I usually increase the 'tick-distance' to be 10-12

```bash
# Save the file using CTRL + X --> then press Y --> finally press ENTER
sudo nano /home/mcserver/minecraft_bedrock/server.properties
```

## Testing the server

It's recommended to test the server by starting it once and verify that it works.

```bash
cd /home/mcserver/minecraft_bedrock/

# Start the server
sudo LD_LIBRARY_PATH=. ./bedrock_server
```

Once you verify that the server is running, type `stop` and press enter to stop it.

## Running Minecraft on Startup

It's recommended to have minecraft start when the server starts to keep it easier to manage.

```bash
# Create a systemd service
sudo nano /etc/systemd/system/mcbedrock.service

sudo systemctl enable mcbedrock
sudo systemctl start mcbedrock

# Verify that the server is running
sudo systemctl status mcbedrock
```

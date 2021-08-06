# steel_blue

[Current Url](https://steelblueweatherapp.duckdns.org:4682/)

## How to host on Heroku and Cloudflare
Making the server run on Heroku. Heroku is free but requires credit card verification.<br>
https://www.youtube.com/watch?v=Li0Abz-KT78<br>
Clouldflare is the easiest way to get an SSL certificate. You need to buy a domain for ~$12 though. I don't know a guide to do this but there should be a lot online.

## How to run the server yourself
This guide only works on linux. Im not sure if all the tools are supported on windows/macos.

### DuckDNS
https://www.duckdns.org/

Make an account. Create a new doman, the name can be whatever you want. Fill in IPv4 and IPv6 for the device. IPv4 can be the same on all your devices so you didn't mess up if you got repeats.

### Getting python
Run these commands in the terminal for Ubuntu. You'll have to change the first two steps a bit on other distros.
```
sudo apt-get python3 (comes with most linux distros so it might not download anything)
sudo apt-get install python3-pip
pip install flask
pip install waitress
pip install requests
```

### Certbot
Get [certbot-dns-duckdns](https://pypi.org/project/certbot-dns-duckdns/). Folow the guide, it'll just work.

### NGINX server
Install
```
sudo apt update
sudo apt install nginx
```
Set up the server
```
cd /etc/nginx/sites-enabled
```
Create a new file called `YOURDOMAINNAME.duckdns.org`. You have to create it with `sudo` or it won't be editable.<br>
Put this in the file. MAKE SURE TO EDIT IT.
```
server {
    listen 4682 ssl;

    ssl_certificate /etc/letsencrypt/live/YOURDOMAINNAME.duckdns.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/YOURDOMAINNAME.duckdns.org/privkey.pem;


    server_name YOURDOMAINNAME.duckdns.org;

 location / {

            proxy_pass http://localhost:4680;
            proxy_set_header X-Real-IP $remote_addr;
       }
}
```
restart ngnix with `systemctl restart ngnix`

### Starting the server
Make sure to start with server with `python3 run.py`. Once you've confirmed theres no errors, start it with `nohup python3 run.py &` so you don't need to leave the terminal open.

### Port forwarding
This is different on every router so you need to look it up for your brand. Make sure the ports 4680-4682 are forwarded on the device hosting the server.

### ALL DONE
If you did everything right, the site should be hosted at `https://YOURDOMAINNAME.duckdns.org`.

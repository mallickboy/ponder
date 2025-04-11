# Run code

## Start Frontend
```bash
cd frontend

npm run dev
```
- For very first run
```bash
cd frontend

npm i
```
If you are deploying using vercel take environment variables [ name : value ] from /frontend/.env.local as vercel by default uses https so http://ip would be blocked by the browser so get https://your_domain.com first and for all the variables change domain portion with your custom domain like 
``` bash
https://api.ponder.mallickboy.com/api/v1/use....  ->  https://your_domain.com/api/v1/use.... 
```
Details instructions has been provided in Backend Server Setup and later on portion

## Start Backend 

### Test run backend
```bash
cd backend

.venv\Scripts\activate  

uvicorn app.server:app 

uvicorn app.server:app --host 0.0.0.0 --port 8080  ( ALL )

/home/mallickboy/ponder/backend/.venv/bin/gunicorn app.server:app \ 
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8080 \
  --workers 2 \
  --timeout 120
``` 
- For very first run
```bash
cd backend

.venv\Scripts\activate 

pip install -r requirements.txt
```

### Backend Server Setup

#### Deploy using guinicorn (uvicorn) as a service

```bash
sudo nano /etc/systemd/system/api.ponder.service     paste code of server_setup/api.ponder.service

sudo systemctl daemon-reload

sudo systemctl restart api.ponder.service

sudo systemctl enable api.ponder.service

sudo systemctl status api.ponder.service
```
#### NGINX
```bash
sudo nano /etc/nginx/sites-available/api.ponder.mallickboy.com  ( copy contents of server_setup/api.ponder.mallickboy.com)

sudo ln -s /etc/nginx/sites-available/api.ponder.mallickboy.com /etc/nginx/sites-enabled/

sudo nginx -t 

sudo systemctl reload nginx

sudo systemctl restart nginx

```

#### Domain & SSL
```bash
Type = "A Record"   Host= "api.ponder"    Value = "server public ip"  TTL = "Automatic"  ( Sub-Domain )

sudo apt install certbot python3-certbot-nginx

sudo certbot --nginx -d api.ponder.mallickboy.com

sudo certbot certificates

sudo systemctl status certbot.timer (check auto renewal)
```


# My Plans

## Now manually design the frontend & add signup/in

## Idea 
- Add clerk and update user name and avater ( Done)

- Fetch user profile and project once at login/sign up (Next)

- If send user message with profile id to gpt 

- based on the query and id gpt gives personalized answer (reply: " gpt reply",ProjectUpdate: False, ProjectData: ""  )

- for project update gpt also gives ProjectUpdate  and json along with reply (reply: " gpt reply",ProjectUpdate: True, ProjectData: json format  )

## Idea 10th April
- Create user profile in database while signup
- Fetch User profile while sign in / refresh
- Design frontend
- Host and send
- Work on bot part

## Style
- top Heading [ nunito, #7884FF, 14px, bold]            @
- main Heading [Nuunito, white, 26px, extrabold]
- project timeline (week 1) [nunito, black, 12px, bold]
- project subHeading [nunito, #FC8D0B, 20px, extrabold]
- project Core question [nunito, #3B2DD5, 12px , extrabold ]
- project text [nunito, black, 12, semibold]

- Navbar tabs [nunito, #ffffff,16, extrabold]

- Chat text Po [nunito, black, 14, medium]    
- chat text User [roboto, white, 12, regular] 

## GPT
- Chat id for each user profile (chat thread)
- Disable sharing context between chats

## 10 th April Status
- Done frontend
- Done basic backend setup
- Done user Authentication
- Added actions to appropriate button
- Used proper color , fonts and other design

## Next
- After login check create profile to DB and fetch data (gems, points, level) [ complete it ]
- Add GPT (Though frontend-backend pipeline is done but proper response gathering is a research work) [ try or hold ]

## 11 th April 
- Completed the remaining par of DB fetch and profile creation
- Working on hosting

## Next 
- deploy

## Deployment
- done 
- added domain & https as browser blocked no reqest from https to http for security 

## Next 
- Connect designed gpt backend with gpt api & maintain personalized guidence

### Deploy Frontend Seperately 
```bash
cd frontend

sudo apt install npm

npm i

npm run build

npm start
```



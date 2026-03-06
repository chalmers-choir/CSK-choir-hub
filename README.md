# CSK Choir Hub (2025/2026)

A full‑stack choir management platform built with **TypeScript**, **React (Next.js)**, and **Node.js/Express**, backed by a **PostgreSQL** database.  
Designed to keep a choir organised, informed, and slightly less chaotic (results may vary near concerts).

---

## Overview

CSK Choir Hub manages members, songs, events, and choir knowledge in one place.

It includes:

- React frontend (Next.js)
- Node.js / Express backend (TypeScript)
- PostgreSQL database
- Dockerised development database

---

## Installation

### Quick Setup (Recommended)

1. **Create environment files (important)**

2. **Run the setup script (macOS/Linux/Windows):**

```bash
npm run setup
```

The setup script will:

- Install dependencies
- Start the Docker database
- Prepare the project

If something fails, read the error. If that fails, try again. If _that_ fails — coffee.

---

## Development

Run both frontend and backend together:

```bash
npm run dev
```

This starts:

- PostgreSQL (Docker) → `localhost:5432`
- Backend → `http://localhost:5050`
- Frontend → `http://localhost:3000`

### Common Issues

**Database connection errors**  
Ensure Docker is running and credentials in `server/.env` are correct.

**Port already in use**  
Some other process is freeloading on your port. Find it and eliminate it (politely).

---

## Production

This section describes a conventional Linux (Ubuntu/Debian) production setup using:

- Node.js
- PostgreSQL
- NGINX (reverse proxy)
- PM2 (process manager)

---

### 1. Update system

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

---

### 2. Install required software

#### Install Node.js (LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

If `node -v` prints something sensible, you succeeded.

---

#### Install PostgreSQL

```bash
sudo apt-get install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

Create database + user:

```bash
sudo -u postgres psql
```

Inside psql:

```sql
CREATE DATABASE choirhub;
CREATE USER choirhub WITH PASSWORD 'strongpassword';
ALTER ROLE choirhub SET client_encoding TO 'utf8';
ALTER ROLE choirhub SET default_transaction_isolation TO 'read committed';
ALTER ROLE choirhub SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE choirhub TO choirhub;
\q
```

Update `server/.env` accordingly.

---

### 3. Install and configure NGINX

```bash
sudo apt-get install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

Allow HTTP/HTTPS through firewall:

```bash
sudo ufw allow 'Nginx Full'
```

---

### 4. Clone and install the project

```bash
git clone https://github.com/chalmers-choir/CSK-choir-hub
cd CSK-choir-hub
npm install
cd server && npm install && cd ..
```

---

### 5. Configure environment variables

Create:

```
server/.env
client/.env
```

At minimum:

```
NODE_ENV=production
DATABASE_URL=postgres://choirhub:strongpassword@localhost:5432/choirhub
PORT=5050
```

Never commit `.env` files. Ever. Not even once. Not even “just to test”.

---

### 6. Build the application

```bash
npm run build
```

---

### 7. Start in production

```bash
npm run prod
```

Expected services:

- Backend → `localhost:5050`
- Frontend → `localhost:3000`

If this step fails, **do not continue**. Fix it first.

---

### 8. Configure NGINX reverse proxy

Create config file (use any editor you like — nano, vim, emacs, or raw determination):

```bash
sudo nano /etc/nginx/sites-available/choir-hub
```

Paste:

```nginx
server {
    listen 80;
    server_name _;

    location /api/ {
        proxy_pass http://localhost:5050/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/choir-hub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

If `nginx -t` fails, read the error. NGINX errors are cryptic, but never random.

---

### 9. Enable HTTPS (recommended)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx
```

Follow the prompts to enable automatic HTTPS and renewal.

---

### 10. Keep the app running with PM2

PM2 ensures the app stays alive, restarts on crashes, and survives server reboots (unlike some rehearsal attendance).

#### Install PM2

```bash
sudo npm install -g pm2
pm2 -v
```

#### Start the app

```bash
pm2 start npm --name choir-hub -- run prod
```

#### Enable auto‑start

```bash
pm2 startup
pm2 save
```

#### Useful PM2 commands

```bash
pm2 list
pm2 logs choir-hub
pm2 restart choir-hub
pm2 stop choir-hub
pm2 delete choir-hub
```

---

### Useful operations

Restart backend:

```bash
pm2 restart choir-hub
```

Restart nginx:

```bash
sudo systemctl restart nginx
```

View logs:

```bash
sudo journalctl -u nginx -f
pm2 logs choir-hub
```

---

## Production Checklist

- [ ] System updated
- [ ] Node installed
- [ ] PostgreSQL running
- [ ] Database + user created
- [ ] `.env` configured
- [ ] App builds successfully
- [ ] PM2 running
- [ ] NGINX configured
- [ ] HTTPS enabled

---

## License

Internal project — not for public distribution (yet).

If you are reading this and are not in the choir, you have either great curiosity or incorrect permissions.

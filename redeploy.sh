#!/bin/bash
set -e

# --- 1. STOP & CLEANUP ---
echo "Stopping services..."
pm2 stop Tally-backend || true
pm2 delete Tally-backend || true

# (Skipping backup since we are writing a fresh .env with new DB)
# echo "Backing up Backend .env..."
# cp /var/www/Tally_Services/Backend/.env /root/backend.env.backup || echo "No .env found, skipping backup"

echo "Removing old files..."
rm -rf /var/www/Tally_Services

echo "Removing old Nginx configs..."
rm -f /etc/nginx/sites-enabled/mittalonlineservices.com.conf
rm -f /etc/nginx/sites-enabled/admin.mittalonlineservices.com.conf
rm -f /etc/nginx/sites-enabled/api.mittalonlineservices.com.conf

rm -f /etc/nginx/sites-available/mittalonlineservices.com.conf
rm -f /etc/nginx/sites-available/admin.mittalonlineservices.com.conf
rm -f /etc/nginx/sites-available/api.mittalonlineservices.com.conf

# --- 2. FRESH INSTALL ---
echo "Cloning repository..."
git clone https://github.com/soleteee/Tally_Services.git /var/www/Tally_Services

# --- 2.5 CREATE BACKEND .ENV (With Provided MongoDB URI) ---
echo "Creating Production Backend .env..."
mkdir -p /var/www/Tally_Services/Backend
# Note: Password 'Tally@1234' has an '@' which is URL-encoded to '%40' to avoid parsing errors. '%%' escapes '%' in printf.
printf 'PORT=5000
MONGODB_URI=mongodb+srv://Tally_db_user:Tally%%401234@tally.5uqhydu.mongodb.net/?appName=Tally
EMAIL_USER=mittalonlineservices@gmail.com
EMAIL_PASS=ieyyupyniigdpdkf
' > /var/www/Tally_Services/Backend/.env

# --- 3. Backend Setup ---
echo "Installing Backend..."
cd /var/www/Tally_Services/Backend
npm install
pm2 start src/index.js --name "Tally-backend"

# --- 4. Frontend Setup ---
echo "Building Frontend..."
cd /var/www/Tally_Services/Frontend
npm install
npm run build

# --- 5. Admin Setup ---
echo "Building Admin..."
cd /var/www/Tally_Services/Admin
npm install
npm run build

# --- 6. Nginx Config (Main Site with API Proxy) ---
echo "Configuring Nginx..."
printf 'server {
    listen 80;
    server_name mittalonlineservices.com www.mittalonlineservices.com;

    root /var/www/Tally_Services/Frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
' > /etc/nginx/sites-available/mittalonlineservices.com.conf

# --- 7. Nginx Config (Admin Site) ---
printf 'server {
    listen 80;
    server_name admin.mittalonlineservices.com;

    root /var/www/Tally_Services/Admin/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
' > /etc/nginx/sites-available/admin.mittalonlineservices.com.conf

# --- 8. Restart ---
echo "Restarting Nginx..."
ln -s /etc/nginx/sites-available/mittalonlineservices.com.conf /etc/nginx/sites-enabled/ || true
ln -s /etc/nginx/sites-available/admin.mittalonlineservices.com.conf /etc/nginx/sites-enabled/ || true
nginx -t && systemctl restart nginx

echo "Deployment Complete! Visit http://mittalonlineservices.com"
echo "---------------------------------------------------"
echo "Enabled Sites:"
ls -l /etc/nginx/sites-enabled/
echo "---------------------------------------------------"
echo "Available Sites:"
ls -l /etc/nginx/sites-available/

#!/bin/bash
set -e

# --- Configuration ---
PROJECT_DIR="/var/www/Tally_Services"
REPO_URL="https://github.com/soleteee/Tally_Services.git"
BACKEND_DIR="$PROJECT_DIR/Backend"
FRONTEND_DIR="$PROJECT_DIR/Frontend"
ADMIN_DIR="$PROJECT_DIR/Admin"

echo "Starting Resilient Deployment..."

# --- 1. SYNC FILES (Non-destructive) ---
if [ -d "$PROJECT_DIR" ]; then
    echo "Directory exists. Updating via git pull..."
    cd "$PROJECT_DIR"
    git fetch --all
    git reset --hard origin/main
else
    echo "Directory missing. Cloning fresh repository..."
    mkdir -p /var/www
    git clone "$REPO_URL" "$PROJECT_DIR"
    cd "$PROJECT_DIR"
fi

# --- 2. BACKEND SETUP ---
echo "Configuring Backend..."
mkdir -p "$BACKEND_DIR"
printf 'PORT=5000
MONGODB_URI=mongodb+srv://Tally-services-db:TallyServices%%401234@tally-services.ikdgdfk.mongodb.net/?appName=Tally-Services
EMAIL_USER=mittalonlineservices@gmail.com
EMAIL_PASS=ieyyupyniigdpdkf
' > "$BACKEND_DIR/.env"

cd "$BACKEND_DIR"
echo "Installing Backend dependencies..."
npm install
pm2 stop Tally-backend || true
pm2 delete Tally-backend || true
pm2 start src/index.js --name "Tally-backend"

# --- 3. FRONTEND & ADMIN BUILD ---
echo "Building Frontend..."
cd "$FRONTEND_DIR"
npm install
npm run build

echo "Building Admin..."
cd "$ADMIN_DIR"
npm install
npm run build

# --- 4. NGINX CONFIGURATION ---
echo "Configuring Nginx..."

# Main Site Config
printf 'server {
    listen 80;
    server_name mittalonlineservices.com www.mittalonlineservices.com;

    root /var/www/Tally_Services/Frontend/dist;
    index index.html;

    location / {
        # Support for unique SEO source code per page
        try_files $uri $uri/index.html $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API alias for consistency
    location /api {
        rewrite ^/api/(.*)$ /api/$1 break;
        proxy_pass http://localhost:5000;
    }
}
' > /etc/nginx/sites-available/mittalonlineservices.com.conf

# Admin Site Config
printf 'server {
    listen 80;
    server_name admin.mittalonlineservices.com;

    root /var/www/Tally_Services/Admin/dist;
    index index.html;

    location / {
        try_files $uri $uri/index.html $uri/ /index.html;
    }
}
' > /etc/nginx/sites-available/admin.mittalonlineservices.com.conf

# --- 5. RESTART NGINX ---
echo "Restarting Nginx..."
ln -s /etc/nginx/sites-available/mittalonlineservices.com.conf /etc/nginx/sites-enabled/ || true
ln -s /etc/nginx/sites-available/admin.mittalonlineservices.com.conf /etc/nginx/sites-enabled/ || true
nginx -t && systemctl restart nginx

echo "Deployment Successful! Unique SEO pages are now enabled."

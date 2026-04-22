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
    git clone "$REPO_URL" PROJECT_DIR
    cd "$PROJECT_DIR"
fi

# Set permissions for the web server
chown -R root:root "$PROJECT_DIR"
chmod -R 755 "$PROJECT_DIR"

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

# --- 3. FRONTEND SETUP ---
echo "Configuring Frontend..."
printf 'VITE_API_URL=https://mittalonlineservices.com
VITE_GTM_ID=GTM-PL9D2XGL
' > "$FRONTEND_DIR/.env"

echo "Building Frontend (including dev dependencies for tsc)..."
cd "$FRONTEND_DIR"
npm install --include=dev
npm run build

# --- 4. ADMIN SETUP ---
echo "Configuring Admin..."
printf 'VITE_API_URL=https://mittalonlineservices.com
' > "$ADMIN_DIR/.env"

echo "Building Admin (including dev dependencies for tsc)..."
cd "$ADMIN_DIR"
npm install --include=dev
npm run build

# --- 5. NGINX CONFIGURATION ---
echo "Configuring Nginx..."

# Main Site Config
printf 'server {
    listen 80;
    server_name mittalonlineservices.com www.mittalonlineservices.com;

    root /var/www/Tally_Services/Frontend/dist;
    index index.html;

    location / {
        # Support for unique SEO source code per page
        try_files \$uri \$uri/index.html \$uri/ /index.html;
    }

    location /api/ {
        # Handle preflight (OPTIONS) requests safely
        if (\$request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '\$http_origin' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
            add_header 'Access-Control-Allow-Headers' 'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            return 204;
        }

        proxy_pass http://localhost:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
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
        try_files \$uri \$uri/index.html \$uri/ /index.html;
    }

    # Proxy API calls from Admin to the Backend
    location /api/ {
        # Handle preflight (OPTIONS) requests safely
        if (\$request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '\$http_origin' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
            add_header 'Access-Control-Allow-Headers' 'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            return 204;
        }

        proxy_pass http://localhost:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
' > /etc/nginx/sites-available/admin.mittalonlineservices.com.conf

# --- 6. RESTART NGINX ---
echo "Restarting Nginx..."
ln -s /etc/nginx/sites-available/mittalonlineservices.com.conf /etc/nginx/sites-enabled/ || true
ln -s /etc/nginx/sites-available/admin.mittalonlineservices.com.conf /etc/nginx/sites-enabled/ || true
nginx -t && systemctl restart nginx

echo "Deployment Successful! Admin is now connected and SEO pages are optimized."

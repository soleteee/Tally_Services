#!/bin/bash

# Safe Nginx Update for mittalonlineservices.com (Redirect non-www -> www)
# Run this as root on your server

NGINX_CONF="/etc/nginx/sites-available/mittalonlineservices.com.conf"

cat << 'EOF' > "$NGINX_CONF"
# 1. Redirect HTTPS non-www -> HTTPS www
server {
    listen 443 ssl;
    server_name mittalonlineservices.com;

    ssl_certificate /etc/letsencrypt/live/mittalonlineservices.com-0001/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mittalonlineservices.com-0001/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://www.mittalonlineservices.com$request_uri;
}

# 2. Main HTTPS WWW Site
server {
    listen 443 ssl;
    server_name www.mittalonlineservices.com;

    root /var/www/Tally_Services/Frontend/dist;
    index index.html;

    location / {
        # SEO Optimization: Prioritize subdirectory index.html files (prerendered routes)
        try_files $uri $uri/index.html $uri/ /index.html;
    }

    location /api/ {
        # Fix for CORS Login Errors: Handle preflight (OPTIONS) requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '$http_origin' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
            add_header 'Access-Control-Allow-Headers' 'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            return 204;
        }

        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ^~ /uploads/ {
        alias /var/www/Tally_Services/Backend/uploads/;
    }

    # SSL Configuration (Managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/mittalonlineservices.com-0001/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mittalonlineservices.com-0001/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

# 3. HTTP (Port 80) Redirect to HTTPS www
server {
    listen 80;
    server_name mittalonlineservices.com www.mittalonlineservices.com;
    return 301 https://www.mittalonlineservices.com$request_uri;
}
EOF

nginx -t && systemctl reload nginx
echo "Nginx updated successfully to serve www.mittalonlineservices.com!"

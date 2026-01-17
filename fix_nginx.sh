#!/bin/bash

# Nginx Configuration Fix Script
# Run this on your server (SRV918926) as root (sudo).

NGINX_CONF="/etc/nginx/sites-available/default"

echo "Checking Nginx configuration at $NGINX_CONF..."

if [ ! -f "$NGINX_CONF" ]; then
    echo "Error: Config file $NGINX_CONF not found."
    echo "Please update the NGINX_CONF variable in this script to point to your actual config file."
    exit 1
fi

# 1. Backup the existing config
cp "$NGINX_CONF" "${NGINX_CONF}.bak_$(date +%s)"
echo "Backup saved."

# 2. Check if /api block already exists
if grep -q "location /api" "$NGINX_CONF"; then
    echo "Warning: 'location /api' block already exists in config."
    echo "Please check manually to ensure it points to http://localhost:5000."
else
    # 3. Inject the API block before 'location /'
    # This assumes a standard React/SPA setup where 'location /' exists.
    if grep -q "location / {" "$NGINX_CONF"; then
        echo "Injecting /api proxy configuration..."
        
        # Insert the API block before 'location / {'
        sed -i '/location \/ {/i \
    location /api { \
        proxy_pass http://localhost:5000; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade $http_upgrade; \
        proxy_set_header Connection "upgrade"; \
        proxy_set_header Host $host; \
        proxy_cache_bypass $http_upgrade; \
    } \
' "$NGINX_CONF"

        echo "Configuration updated."
    else
        echo "Error found: Could not locate 'location / {' to anchor the insertion."
        echo "Please edit $NGINX_CONF manually and add the proxy_pass for /api."
        exit 1
    fi
fi

# 4. Test configuration
echo "Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "Configuration valid. Restarting Nginx..."
    systemctl restart nginx
    echo "========================================"
    echo "SUCCESS: Nginx updated and restarted."
    echo "The 405 Method Not Allowed error should be resolved."
    echo "========================================"
else
    echo "========================================"
    echo "ERROR: Nginx configuration test failed!"
    echo "Restoring backup..."
    cp "${NGINX_CONF}.bak_$(date +%s)" "$NGINX_CONF"
    echo "Backup restored."
    echo "========================================"
    exit 1
fi

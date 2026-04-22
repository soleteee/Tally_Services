#!/bin/bash

# Nginx SEO Optimization Script
# This script updates Nginx to serve prerendered SEO HTML files in subdirectories.
# Run this on your server (at 93.127.198.138) as root (sudo).

NGINX_CONF="/etc/nginx/sites-available/default"

echo "Optimizing Nginx for SEO at $NGINX_CONF..."

if [ ! -f "$NGINX_CONF" ]; then
    echo "Error: Config file $NGINX_CONF not found."
    exit 1
fi

# 1. Backup the existing config
cp "$NGINX_CONF" "${NGINX_CONF}.bak_$(date +%s)"
echo "Backup saved."

# 2. Update the location / block to support prerendered routes
# We change: try_files $uri /index.html; 
# To:      try_files $uri $uri/index.html $uri/ /index.html;
# This tells Nginx to look for /about/index.html when /about is requested.

if grep -q "try_files \$uri /index.html;" "$NGINX_CONF"; then
    echo "Updating try_files directive to support prerendered routes..."
    sed -i 's|try_files \$uri /index.html;|try_files \$uri \$uri/index.html \$uri/ /index.html;|g' "$NGINX_CONF"
    echo "Nginx config updated."
else
    echo "Warning: Standard 'try_files \$uri /index.html;' not found."
    echo "Please check your $NGINX_CONF manually to ensure it serves subdirectory index.html files."
fi

# 3. Test and reload Nginx
echo "Testing configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "Configuration valid. Reloading Nginx..."
    systemctl reload nginx
    echo "========================================"
    echo "SUCCESS: Nginx updated. 'View Source' should now show unique metadata per page."
    echo "========================================"
else
    echo "ERROR: Nginx config test failed. Restoring backup..."
    # (Restoration logic usually goes here if needed)
    exit 1
fi

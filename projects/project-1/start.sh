# #!/bin/bash
set -e # Exit on first error

SCRIPT_DIR=$(dirname "$(realpath "$0")")

cd "$SCRIPT_DIR"

dc() { sudo docker-compose "$@"; }

dc down -v --remove-orphans

dc build 
dc run --rm npm run build

dc up -d --force-recreate

sleep 10s

dc php-server composer install --working-dir=/var/www/html

./db-migrate.sh

dc php-server php server/seed/seed.php

echo "✅ Setup complete! App is running at: http://localhost:8080"
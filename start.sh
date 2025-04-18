docker-compose down -v --remove-orphans

docker network prune -f

docker-compose build

docker-compose run --rm npm run build

docker-compose up -d

docker-compose exec php-apache composer install --working-dir=/var/www/html

docker-compose run --rm dependencies

./db-migrate.sh

echo "http://localhost:8080"
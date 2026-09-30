# syntax=docker/dockerfile:1

############################################
# 1. Front-end assets (Vite + React + Tailwind)
############################################
FROM node:22-slim AS assets

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY vite.config.js ./
COPY resources ./resources
COPY public ./public
# Tailwind scans compiled Blade views; the folder only needs to exist here.
RUN mkdir -p storage/framework/views && npm run build

############################################
# 2. PHP dependencies
############################################
FROM composer:2 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction --no-progress

COPY . .
RUN composer dump-autoload --optimize --classmap-authoritative --no-dev

############################################
# 3. Runtime: Nginx + PHP-FPM
############################################
FROM serversideup/php:8.4-fpm-nginx AS runtime

ENV PHP_OPCACHE_ENABLE=1 \
    AUTORUN_ENABLED=true \
    HEALTHCHECK_PATH=/up \
    DB_CONNECTION=sqlite \
    DB_DATABASE=/var/www/html/database/sqlite/database.sqlite \
    LOG_CHANNEL=stderr

WORKDIR /var/www/html

COPY --chown=www-data:www-data --from=vendor /app /var/www/html
COPY --chown=www-data:www-data --from=assets /app/public/build /var/www/html/public/build

# Creates the SQLite file before the image's own startup script runs migrations.
COPY --chmod=755 docker/entrypoint.d/ /etc/entrypoint.d/

USER root
RUN mkdir -p database/sqlite \
    && chown -R www-data:www-data database/sqlite storage bootstrap/cache
USER www-data

EXPOSE 8080

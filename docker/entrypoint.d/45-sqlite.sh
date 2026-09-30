#!/bin/sh
# Make sure the SQLite database file exists before migrations run
# (the image's 50-laravel-automations script runs `migrate --force`).
set -e

if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
    db="${DB_DATABASE:-/var/www/html/database/database.sqlite}"
    dir="$(dirname "$db")"
    mkdir -p "$dir"
    [ -f "$db" ] || touch "$db"

    # Hosts like Railway mount volumes as root and run the container as root
    # (RAILWAY_RUN_UID=0). PHP-FPM workers run as www-data, so hand them the folder.
    if [ "$(id -u)" = "0" ]; then
        chown -R www-data:www-data "$dir"
    fi
fi

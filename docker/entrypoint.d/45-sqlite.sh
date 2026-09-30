#!/bin/sh
# Make sure the SQLite database file exists before migrations run
# (the image's 50-laravel-automations script runs `migrate --force`).
set -e

if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
    db="${DB_DATABASE:-/var/www/html/database/database.sqlite}"
    mkdir -p "$(dirname "$db")"
    [ -f "$db" ] || touch "$db"
fi

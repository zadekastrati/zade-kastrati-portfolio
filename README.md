# Zade Kastrati — Portfolio

Personal portfolio built with **Laravel**, **React** and **Tailwind CSS**, animated with **Framer Motion**.

## Stack

- **Laravel 13**: serves the page, embeds the content as JSON, and handles the contact form (validated, rate-limited, honeypot-protected and stored in the database)
- **React 19** + **Framer Motion**: single-page UI with scroll reveals, a parallax browser mockup, magnetic buttons, spotlight cards and animated counters
- **Tailwind CSS v4** via Vite

## Getting started

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
composer run dev        # or: php artisan serve + npm run dev
```

## Editing content

All text, projects, experience and skills live in [`config/portfolio.php`](config/portfolio.php). Change that file; no component edits are needed.

- **Profile photo:** `public/images/zade.jpg` (square). Used in the navbar and the About card.
- **boné images:** stored in `public/images/bone/`.
- **Link preview image:** `public/images/og.png` (1200×630), shown when the site is shared on LinkedIn, WhatsApp and similar apps. Regenerate it if your title or photo changes.

## Contact form

Messages are saved to the `contact_messages` table. To also get them by email, configure `MAIL_*` in `.env`. They are sent to `portfolio.profile.email`.

## Docker

The image is production-ready: assets are built with Node, PHP dependencies installed with Composer, and the app runs on Nginx + PHP-FPM ([serversideup/php](https://serversideup.net/open-source/docker-php/)) as a non-root user.

```bash
docker compose up -d --build     # then open http://localhost:8080
docker compose logs -f app       # follow logs
docker compose down              # stop (data is kept)
```

- **Configuration:** `APP_KEY` and the `MAIL_*` settings are read from `.env`. `compose.yaml` forces production values (`APP_ENV=production`, `APP_DEBUG=false`, logs to stderr) inside the container. Set `APP_URL_DOCKER` to your public URL, e.g. `APP_URL_DOCKER=https://your-domain.com docker compose up -d`.
- **On every start** the container creates the SQLite database if needed, runs migrations and caches config, routes and views.
- **Data** (contact messages, sessions, cache) lives in the `database` volume and survives rebuilds. `docker compose down -v` deletes it.
- **Health check:** `/up`.
- **HTTPS:** terminate TLS at your host's proxy or load balancer; the app trusts forwarded headers so generated URLs use `https://`.

## Deploying to Railway

Railway builds the `Dockerfile` automatically; `railway.json` sets the health check (`/up`) and restart policy.

1. **New Project → Deploy from GitHub repo** and pick this repository.
2. **Variables:** add the ones below.
3. **Volume:** right-click the service → **Attach volume**, mount path `/var/www/html/database/sqlite`.
4. **Settings → Networking → Generate Domain**, then set `APP_URL` to that `https://…up.railway.app` address.

```env
APP_KEY=base64:...            # from your local .env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app.up.railway.app
LOG_LEVEL=error
PORT=8080
RAILWAY_RUN_UID=0             # needed for the volume; the app itself still runs as www-data
MAIL_MAILER=resend
RESEND_API_KEY=re_...
MAIL_FROM_ADDRESS=onboarding@resend.dev
MAIL_FROM_NAME="Zade Kastrati Portfolio"
```

Railway blocks SMTP (Gmail) on the Free and Hobby plans, so email goes through [Resend](https://resend.com)'s HTTPS API. Without your own domain, Resend can only deliver to the email address you signed up with, which is all the contact form needs.

## Tests

```bash
php artisan test
```

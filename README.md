# Setup Project in Local Environment

## System Requirements
- Composer [Install Composer](https://getcomposer.org/download/)
- Laravel 8.0 and required php extension [Laravel System Requirement](https://laravel.com/docs/8.x/deployment#server-requirements)
- OS windows 10
- PHP preferred version 7.4 [XAMPP Download](https://www.apachefriends.org/download.html)
- PgAdmin 4 [PgAdmin Download](https://www.pgadmin.org/download/pgadmin-4-windows/)
- PostgreSQL 10.16, compiled by Visual C++ build 1800,64-bit [PostgreSQL Download](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- Redis for windows [Redis Zip Download](https://dev.to/divshekhar/how-to-install-redis-on-windows-10-3e99)
- memory_limit=512M is prefarable 

## Create Database
1.  Open PGAdmin
2.  Creaete Database named `senderdb`

## Run Redis
1. Go to redis ziped folder
2. Click or run `redis-cli.exe`

## Clone Repository
1.  Go to any directory, recommended folder is xampp/htdocs
2.  Open git client like git bash
3.  Run: `git clone https://github.com/adibhasan/senderdemo.git`
4.  Run: `cd senderdemo`
5.  Rename: .env.dev -> .env
6.  Change DB or Redis user credentials if necessary
7.  Run: `composer update`
8.  Run: `php artisan config:cache`
9.  Run: `php artisan migrate`
10. Run: `php artisan db:seed --class=SubscriberSeeder`  wait until it is finished
11. Run: `php artisan serve`
12. Browse: [Localhost](http://127.0.0.1:8000/)

## Enable debug mode 
1. Open .env file
2. Set APP_DEBUG=true
3. Run: `php artisan config:cache`
4. Reload: [Localhost](http://127.0.0.1:8000/)



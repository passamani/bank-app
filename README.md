# Bank App

A minimal Bank application built with Laravel 8 and React.

## Requirements

-   PHP ^7.3|^8.0
-   Composer ^2.1.12
-   Laravel ^8.65
-   React ^17.0.2
-   MySQL 8
-   Docker ^20.10.7 
    - Or docker-compose ^1.29.2

## Sailing up with docker-compose

-   After cloning the project, run `composer install`
-   Copy env.example to .env changing environment variables
-   Create the App Key running `php artisan key:generate`
-   Then run `./vendor/bin/sail up -d`

## Creating the database

-   Run `docker-compose exec app php artisan migrate:refresh --seed` to create tables and essential data.
    -   If your are runnning without docker, then just run `php artisan migrate:refresh --seed`.
-   After running migrations and seeding the database an admin user will be created with the following credentials:
    -   Email: `admin@example.com`
    -   Password: `12345678`

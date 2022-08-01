# Prepare Database, Table and Data
## php artisan migrate or php artisan migrate:fresh
## php artisan db:seed --class=SubscriberSeeder
## php artisan migrate:fresh --seed

## SELECT * FROM mytable WHERE DATE_PART('year', ) = date_part('year', CURRENT_DATE);

# SELECT * FROM public.subscribers WHERE EXTRACT(YEAR FROM birth_day) = 1988;
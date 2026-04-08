ketika awal setelah cloning dari github 

step 1
npm run install karena disini pake vite

step 2 
composer install

step 3
cp .env.example .env

step4 
php artisan key:generate

setelah itu atur .env
DB_DATABASE=nama_db
DB_USERNAME=root
DB_PASSWORD=

atur sesuain pake database apa mysql paling terus nama dbnya apa

step 5
php artisan migrate

terakhir jalanin projeknya pake 
composer run dev

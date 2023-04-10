#Monta 3 contenedores con la misma imagen de docker , uno para la base de datos en mysql, otro para el servidor en Laravel y el cliente en React
FROM php:7.4-fpm

# Instala las extensiones de PHP necesarias para Laravel
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    libzip-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libwebp-dev \
    libxpm-dev \
    libicu-dev \
    docker.io

RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp --with-xpm
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd intl
#Descargarmos el composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

#instalamos nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

#descargamos el repositorio de laravel
RUN git clone https://github.com/borjeta/foodtrackv4.git

WORKDIR /var/www/html

#copiamos el contenido del repositorio a la carpeta html
COPY ./foodtrackv4 /var/www/html

#instalamos las dependencias de laravel
RUN cd /var/www/html/api && composer install

#instalamos las dependencias de react
RUN cd /var/www/html/material-kit-react-main && npm install

#levantamos los contenenedores de mysql y laravel

RUN docker-compose up -d

#exponemos el puerto 80
EXPOSE 80

RUN cd .. && cd /api && docker-compose up -d



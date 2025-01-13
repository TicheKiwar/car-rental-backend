FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package.json yarn.lock ./

# Instala las dependencias con Yarn
RUN yarn install

# Copia el resto del código fuente al contenedor
COPY . .

# Construye la aplicación
RUN yarn build

# Expone el puerto 3000 para que sea accesible desde fuera del contenedor
EXPOSE 3000

# Comando para ejecutar la aplicación en modo producción
CMD ["yarn", "start:prod"]

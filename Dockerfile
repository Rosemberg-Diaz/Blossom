# Etapa 1: Build
FROM node:18-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Etapa 2: Runtime
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar node_modules desde builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "start"]

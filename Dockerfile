# Image de production : Node construit le site, Nginx ne sert que les fichiers statiques
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Types déjà vérifiés par le CI avant l'image : build Vite direct
RUN npx vite build

FROM nginx:1.29-alpine
# Relie l'image au dépôt sur GHCR (visibilité et page du paquet)
LABEL org.opencontainers.image.source=https://github.com/K0Konut/Graphist_Portfolio
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

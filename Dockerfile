# Image de production (architecture technique §5) : Node pré-rend le site, Nginx ne sert que les fichiers statiques.
# content/, public/medias/ et public/book/ sont copiés de Dashility par le job, avant l'image : la clé n'entre jamais ici
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Types et tests déjà vérifiés par la CI : contrôle du contenu, puis pré-rendu
RUN npm run check-content && npx vite-ssg build

FROM nginx:1.29-alpine
# Relie l'image au dépôt sur GHCR (visibilité et page du paquet)
LABEL org.opencontainers.image.source=https://github.com/K0Konut/Graphist_Portfolio
# Page en construction à la place du site ; revenir au site : annuler ce changement (nginx.conf + dist)
COPY docker/construction.conf /etc/nginx/conf.d/default.conf
COPY docker/construction.html public/favicon.svg /usr/share/nginx/html/

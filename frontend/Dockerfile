# 1. Build stage - build the React app
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# npm build
RUN npm run build

# 2. Serve stage - static files with nginx
FROM nginx:alpine

# Fontos: A dist (ha Vite) vagy build (ha CRA) mappát kell másolni!
COPY --from=build /app/dist /usr/share/nginx/html

# Opcionális: nginx default.conf rewrite-ot tehetsz be, hogy a / route minden SPA route-ot kiszolgáljon:
# (Ha csak frontend, nem kell, de ha pl. /smurf/3 vagy /house/5 route-okra is közvetlenül megy a user, akkor KELL)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

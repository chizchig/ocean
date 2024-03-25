FROM node:alpine AS builder
WORKDIR /app

# Copy package.json from the app directory
COPY app/package.json app/webpack.config.js ./

RUN npm install

# Copy the rest of the app directory
COPY app/ .

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package-lock.json postinstall.ts ./
COPY assets ./assets
RUN npm ci && npm install react-scripts@3.4.1 -g
COPY . ./
RUN npm run build:qa

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
 
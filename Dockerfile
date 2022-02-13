# build stage
FROM node:14.17.6-alpine as build-stage
WORKDIR /app
COPY . .
COPY edit_node_modules/ckeditor4-vue/dist/plugins/justify/ node_modules/ckeditor4-vue/dist/plugins/justify/
RUN npm cache clear --force \
    && npm install \
    && npm run build

# production stage
FROM nginx:1.20.1-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /usr/share/nginx/ \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /etc/nginx \
    && chown -R nginx:nginx /var/log/nginx

RUN touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/run/nginx.pid

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

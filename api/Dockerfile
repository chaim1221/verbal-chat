FROM nginx:1.15.9
LABEL maintainer="chaimeliyah@gmail.com"
EXPOSE 443
ENV DEBIAN_FRONTEND=noninteractive
#ENV MACHETE_USE_HTTPS_SCHEME=https

# install nodejs
RUN apt-get update && \
    apt-get install --no-install-recommends -yq nano wget gnupg apt-transport-https ca-certificates lsof vim iputils-ping && \
    apt-get update && \
    apt-get install -yq nodejs && \
    apt-get clean -y && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

# nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/conf.d/ /etc/nginx/conf.d/

# make web dirs as necessary

# start app ... node server.js
CMD "/bin/bash"

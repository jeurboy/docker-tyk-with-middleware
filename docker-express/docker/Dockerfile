FROM node:6
# replace this with your application's default port
EXPOSE 8888
EXPOSE 4000

WORKDIR /app/code

ENV NODE_PATH=/usr/local/lib/node_modules/
RUN npm config set cache /node_modules/ --global

# RUN apt-get install netcat

CMD "/bin/bash" 
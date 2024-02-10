FROM node:16.15.0

WORKDIR /usr/src/app

COPY . .

RUN npm install package.json
RUN npm install -g truffle
RUN chmod a+x entrypoint.sh

EXPOSE 3000

CMD ["/bin/sh", "entrypoint.sh"]

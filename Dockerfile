FROM node:16.15.0

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_WEB3_STORAGE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM0NUQzNjA4NjM5Y0Y5N0M1ZjBjMGM3MkU0NDE4QkQ2NTE2MjEzNzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTYwMTI2NjcxMzksIm5hbWUiOiJjZXJ0cyJ9.mO8ryR2Z8yOX9sC-8-BQsCmSpImx9q50h8hmhFKia9c

RUN npm install package.json
RUN npm install -g truffle
RUN chmod a+x entrypoint.sh

EXPOSE 3000

CMD ["/bin/sh", "entrypoint.sh"]
FROM node:latest

WORKDIR /opt/todo
COPY . /opt/todo
RUN npm install && npm run build
EXPOSE 5173

CMD ["npm","run","preview","--","--host","0.0.0.0","--port","5173"]

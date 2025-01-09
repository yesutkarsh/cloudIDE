FROM node 
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY routes routes
COPY app.js app.js



ENTRYPOINT [ "node","app.js" ]
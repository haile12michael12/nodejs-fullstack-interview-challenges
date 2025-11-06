FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

# Create directory for heap snapshots
RUN mkdir -p snapshots

EXPOSE 3000 9229

CMD ["node", "--max-old-space-size=1024", "src/index.js", "start"]
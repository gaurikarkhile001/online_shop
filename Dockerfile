# ---- Build Stage ----
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ---- Runtime Stage ----
FROM node:18-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# volume to persist data
VOLUME /app/data

EXPOSE 5173

ENV PORT=5173
ENV HOST=0.0.0.0

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]

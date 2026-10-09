# ---- INSECURE ----
FROM node:latest

# Secrets baked into image
ENV DB_PASSWORD=SuperSecret123
ENV API_KEY=prod-key-do-not-share
ENV NODE_ENV=production

WORKDIR /app

# Copy everything (including .env, .git, node_modules)
COPY . .

RUN npm install

# No USER directive -> runs as root
# No HEALTHCHECK
# No .dockerignore -> secrets leaked into image layers
EXPOSE 3000

CMD ["node", "server.js"]
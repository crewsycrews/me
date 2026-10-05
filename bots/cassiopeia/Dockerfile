FROM node:24.21.0-bookworm-slim
ENV NODE_ENV=production DATABASE_PATH=/app/data/cassiopeia-max.sqlite PORT=3000
ENV NODE_EXTRA_CA_CERTS=/app/certs/russian-trusted-ca.pem
WORKDIR /app
COPY --chown=node:node package.json ./
COPY --chown=node:node src ./src
COPY --chown=node:node certs ./certs
RUN mkdir -p /app/data && chown node:node /app/data
USER node
EXPOSE 3000
CMD ["node", "src/main.mjs"]

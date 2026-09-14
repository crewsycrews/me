FROM node:24.21.0-bookworm-slim
ENV NODE_ENV=production DATABASE_PATH=/app/data/cassiopeia.sqlite PORT=3000
WORKDIR /app
COPY --chown=node:node package.json ./
COPY --chown=node:node src ./src
RUN mkdir -p /app/data && chown node:node /app/data
USER node
EXPOSE 3000
CMD ["node", "src/main.mjs"]

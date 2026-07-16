FROM node:26-bookworm-slim
ENV CI=true
WORKDIR /app
RUN mkdir -p /app/graphics
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
RUN npm install -g pnpm@11
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm run build
EXPOSE 3000
CMD ["./build/server.js"]

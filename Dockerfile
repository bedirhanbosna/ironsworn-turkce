# ─── Build aşaması ───────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

# Bağımlılıklar (lockfile ile tekrarlanabilir)
COPY package.json package-lock.json ./
RUN npm ci

# Kaynak + veri (Oyun dataları/ PDF'leri dahil — copy-data bunları kullanır)
COPY . .

# adapter-static → build/ (önce copy-data çalışır: data + PDF'ler static/'e kopyalanır)
RUN npm run build

# ─── Servis aşaması ──────────────────────────────────────────────
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

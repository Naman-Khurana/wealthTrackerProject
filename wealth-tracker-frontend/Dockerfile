FROM node:20.20.2-alpine3.23 AS builder

WORKDIR /build

COPY package.json package.json
COPY package-lock.json package-lock.json

# implement standalone mode for further optimization of node modules export/copy
RUN npm install

COPY . .

RUN npm run build



FROM node:20.20.2-alpine3.23 as runner

WORKDIR /app
EXPOSE 3000

COPY --from=builder /build/node_modules node_modules
COPY --from=builder /build/package.json package.json
COPY --from=builder /build/package-lock.json package-lock.json
COPY --from=builder /build/.next/ .next/
COPY --from=builder /build/public/ public/


CMD [ "npm", "start" ]
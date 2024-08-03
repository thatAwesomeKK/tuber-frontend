FROM --platform=linux/arm64 node:20-alpine as builder
WORKDIR /my-space

RUN npm install -g pnpm

ENV NEXT_PUBLIC_CALLBACK_URL=https://tuber.thatawesomekk.eu.org
ENV NEXT_PUBLIC_CLIENT_URL=https://metadata.thatawesomekk.eu.org

COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm run build

FROM --platform=linux/arm64 node:20-alpine as runner
RUN npm install -g pnpm
WORKDIR /my-space
COPY --from=builder /my-space/package.json .
COPY --from=builder /my-space/pnpm-lock.yaml .
COPY --from=builder /my-space/next.config.mjs ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next/standalone ./
COPY --from=builder /my-space/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["pnpm", "run", "start"]
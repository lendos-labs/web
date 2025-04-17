# Builder
FROM --platform=linux/x86_64 node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo

COPY . .
RUN turbo prune --scope=evm --docker


# Installer
FROM --platform=linux/x86_64 node:20-alpine AS  installer
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache python3 make g++
RUN apk update

WORKDIR /app
RUN yarn global add pnpm
RUN yarn global add turbo

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG NODE
ENV NODE=${NODE}

COPY ./apps/evm/.env.${NODE} ./apps/evm/.env.production
ENV NODE_ENV=production

RUN turbo build --filter=evm...

# Runner
FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/evm/next.config.mjs .
COPY --from=installer /app/apps/evm/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/evm/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/evm/.next/static ./apps/evm/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/evm/public ./apps/evm/public

CMD node apps/evm/server.js
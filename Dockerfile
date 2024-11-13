FROM node:18.20-alpine AS base
# update and install OS dependencies
#RUN apk add git
RUN apk update && apk upgrade

FROM base AS build
# create destination directory
WORKDIR /build

# copy the app, note .dockerignore
COPY . .
RUN npm install
RUN npm run build


FROM base AS final

WORKDIR /app
COPY --from=build /build/.output .

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "node", "./server/index.mjs" ]
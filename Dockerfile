# build env
FROM debian:bullseye-slim AS build_env
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -y update && \
    apt-get -y install npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY . /opt/app/
WORKDIR /opt/app
RUN cd frontend/9chan && npm install
RUN cd frontend/9chan && npm run build

# production env
FROM debian:bullseye-slim

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -y update && \
    apt-get -y install ruby bundler libsqlite3-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY . /opt/app/
COPY --from=build_env /opt/app/frontend/9chan/build /opt/app/frontend/9chan/build

WORKDIR /opt/app

RUN bundle install

CMD rackup -p 9292 -o 0.0.0.0

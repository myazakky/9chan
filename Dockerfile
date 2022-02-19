FROM debian:bullseye-slim

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -y update && \
    apt-get -y install ruby bundler libsqlite3-dev npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY . /opt/app/

WORKDIR /opt/app

RUN bundle install
RUN cd frontend/9chan && npm install
RUN cd frontend/9chan && npm run build

CMD rackup -p 9292 -o 0.0.0.0

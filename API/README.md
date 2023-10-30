# TimeManagerApi

To create the database container:
  * Install <a href="https://docs.docker.com/engine/install/" target="_blank">Docker</a>
  * Run `docker-compose up -d` to get and start the database container

To start your Phoenix server:
  * Run `mix deps.get` to install and setup dependencies
  * Run `mix ecto.create` to create the database
  * Run `mix ecto.migrate` to create tables inside the database
  * Run `mix phx.server` to start API

Now you can visit [`${process.env.API_IP}:${process.env.API_PORT}`](http://${process.env.API_IP}:${process.env.API_PORT}) from your browser.

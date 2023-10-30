## write a dockerfile to run a elixir api with phoenix

# pull the base image
FROM bitwalker/alpine-elixir-phoenix:latest
# set the working direction
WORKDIR /app

# copy the content of the current directory to the root directory
COPY . .

# install dependencies
RUN chmod +x ./shell.sh
RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix archive.install hex phx_new --force
RUN mix deps.get

# build the app
# expose the port
EXPOSE 4000

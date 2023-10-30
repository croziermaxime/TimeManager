#!/bin/sh
# shellcheck disable=SC2028

echo "\n Creating and migrating postgres database..."
mix ecto.create
mix ecto.migrate
echo "\n Ecto database created and migrated!"

echo "\n Launching Phoenix web server..."
mix phx.server
echo "\n Phoenix web server launched!"
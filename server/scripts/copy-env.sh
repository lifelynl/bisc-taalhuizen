#!/bin/bash

SCRIPT_PATH="$( cd "$(dirname "$0")" ; pwd -P )"
ENV_FILE="$SCRIPT_PATH/../.env"
ENV_EXAMPLE_FILE="$SCRIPT_PATH/../.env.example"

if [ ! -f "$ENV_FILE" ]; then
    tput setaf 2;

    cp $ENV_EXAMPLE_FILE $ENV_FILE

    echo -e "✓ Generated .env file"
else
    tput setaf 3;
    echo -e "!! ⚠  !!  Environment file .env already exists so not creating, you might want to check if .env.example has new additions\n"
    git --no-pager diff --no-index $ENV_FILE $ENV_EXAMPLE_FILE || true
    echo
fi
#!/bin/bash

# Check if the directory is correct
if [ ! -d "../indices" ]; then
    echo "Directory ../indices does not exist or is not accessible."
    exit 1
fi

echo "["

first=true

# List all files found in the ../indices directory
for file in $(find ../docs/indices/* -type f); do
    echo "Found file: $file"  # Debug output
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        name_without_extension="${filename%.*}"
        if [ "$first" = true ]; then
            first=false
        else
            echo ","
        fi
        echo "    \"$name_without_extension\""
    fi
done

echo "]"

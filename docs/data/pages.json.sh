#!/bin/bash

echo "["

first=true

for file in ../../indices/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        name_without_extension="${filename%.*}"
        if [ "$first" = true ]; then
            first=false
        else
            echo ","
        fi
        echo "\"$name_without_extension\""
    fi
done

echo "]"
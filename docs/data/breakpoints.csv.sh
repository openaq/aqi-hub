#!/bin/bash

header_written=false

find . -type f -name 'breakpoints.csv' | while read csv_file; do
    if [ "$header_written" = false ]; then
        head -n 1 "$csv_file"
        header_written=true
    fi
    tail -n +2 "$csv_file"
    echo
done

#!/bin/bash

header_written=false

find . -type f -name 'breakpoints.csv' | while read csv_file; do
    if [ "$header_written" = false ]; then
        # Output the header to stdout
        head -n 1 "$csv_file"
        header_written=true
    fi
    # Append the rest of the CSV file, skipping the header
    tail -n +2 "$csv_file"
    echo
done

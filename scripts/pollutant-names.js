import { readFileSync, readdir, stat as _stat } from 'fs';
import { join, extname } from 'path';

const directoryPath = process.argv[2];
const searchStrings = [
    'PM2.5',
    'PM10',
    'O3',
    'NO2',
    'SO2',
    'H2S'
];

if (!directoryPath) {
    console.error('Usage: node pollutant-names.js <directory-path>');
    process.exit(1);
}

const checkFile = (filePath) => {
    try {
        const data = readFileSync(filePath, 'utf8');
        searchStrings.forEach(searchString => {
            if (data.includes(searchString)) {
                console.error(`Error: The string "${searchString}" was found in file "${filePath}".`);
                hasError = true;
            }
        });
    } catch (err) {
        console.error(`Error reading file "${filePath}": ${err.message}`);
        hasError = true;
    }
};

const walkDirectory = (dir) => {
    readdir(dir, (err, files) => {
        if (err) {
            console.error(`Error reading directory "${dir}": ${err.message}`);
            process.exit(1);
        }

        files.forEach(file => {
            const fullPath = join(dir, file);

            _stat(fullPath, (err, stat) => {
                if (err) {
                    console.error(`Error stating file "${fullPath}": ${err.message}`);
                    process.exit(1);
                }

                if (stat.isDirectory()) {
                    walkDirectory(fullPath);
                } else if (extname(fullPath) === '.md') {
                    checkFile(fullPath);
                }
            });
        });
    });
};

let hasError = false;

walkDirectory(directoryPath);

if (hasError) {
    process.exit(1);
}

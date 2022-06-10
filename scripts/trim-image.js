const glob = require('glob');
const trimImage = require('trim-image');
const inquirer = require('inquirer');
const clc = require('cli-color');
const fs = require('fs');

const config = {
    src: 'src',
    dist: 'dist'
}

const errorMessage = (message) => {
    log(clc.redBright(`⛔️ ${message}`));
}

const isPngImage = (file) => file.match(/\.png$/);

const storePath = (file) => file.split('/').slice(0, -1).join('/');

inquirer
    .prompt([
        {
            name: 'src',
            message: 'Please select a source directory: ',
            default: config.src
        },
        {
            name: 'dist',
            message: 'Please select a distribution directory: ',
            default: config.dist
        }
    ]).then(answers => {

        const { src, dist } = answers;
        const srcPath = `${src}/**/**`;

        glob(srcPath, (error, files) => {

            if (error) {
                return console.error(error);
            }

            files.forEach(file => {
                if (isPngImage(file)) {

                    const targetPath = storePath(file);
                    const distPath = `${dist}/${targetPath}`;
                    const distFile = `${dist}/${file}`;

                    fs.mkdir(distPath, { recursive: true }, (error) => {
                        if (error) {
                            return console.error(error);
                        }

                        console.log(clc.blue("Input PNG image: "), file);
                        console.log(clc.blue("Output PNG image: "), file);

                        trimImage(file, distFile);
                    });
                }
            });

        });

        console.log(clc.blue("Finished trim images: "), dist);

    });

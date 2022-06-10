const glob = require('glob-promise');
const trimImage = require('trim-image');
const inquirer = require('inquirer');
const clc = require('cli-color');
const fs = require('fs');

const config = {
    src: 'src',
    dist: 'dist'
}

const isPngImage = (file) => file.match(/\.png$/);

const storePath = (file) => file.split('/').slice(0, -1).join('/');

(async () => {
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

            glob(srcPath)
                .then(files => {

                    files.forEach(file => {
                        if (isPngImage(file)) {

                            const targetPath = storePath(file);
                            const distPath = `${dist}/${targetPath}`;
                            const distFile = `${dist}/${file}`;

                            fs.mkdir(distPath, { recursive: true }, (error) => {
                                if (error) {
                                    return console.error(error);
                                }

                                console.log(clc.blue("Input : "), file);
                                console.log(clc.blue("Output: "), distFile);

                                trimImage(file, distFile);
                            });
                        }
                    });


                });
            // .finally(() => {
            //     console.log(clc.yellow("Finished trim images: "), dist);
            // })

        });
})()

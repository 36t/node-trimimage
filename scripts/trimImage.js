const glob = require("glob-promise");
const trimImage = require("trim-image");
const inquirer = require("inquirer");
const clc = require("cli-color");
const fs = require("fs");

const { cleanDirectory } = require('./modules/cleanDirectory.js')

const config = {
    src: "src",
    dist: "dist"
};

const isPngImage = (file) => file.match(/\.png$/);
const fileName = (file) => file.split("/").slice(-1)[0];
const storePath = (file) => file.split("/").slice(1, -1).join("/");

(async () => {
    inquirer
        .prompt([
            {
                name: "src",
                message: "Please select a source directory: ",
                default: config.src
            },
            {
                name: "dist",
                message: "Please select a distribution directory: ",
                default: config.dist
            }
        ]).then(async answers => {

            const { src, dist } = answers;
            const srcPath = `${src}/**/**`;

            await cleanDirectory(dist);

            await glob(srcPath)
                .then(files => {
                    files.forEach(file => {
                        if (isPngImage(file)) {

                            const targetPath = storePath(file);
                            const distPath = `${dist}/${targetPath}`;
                            const pngFile = fileName(file);
                            const distFile = `${distPath}/${pngFile}`;

                            fs.mkdir(distPath, { recursive: true }, (error) => {
                                if (error) {
                                    return console.error(error);
                                }

                                console.log(clc.blue("input : "), file);
                                console.log(clc.blue("output: "), distFile);

                                trimImage(file, distFile);
                            });
                        }
                    });
                });

        });
})();

import clc from "cli-color";
import imagemin from "imagemin";
import imageminPngquant from "imagemin-pngquant";
import inquirer from "inquirer";

import { removeDirectory } from "./modules/removeDirectory.mjs";
import { directoryList } from "./modules/directoryList.mjs";

const config = {
    src: "src",
    dist: "compressed"
};

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

            const directories = await directoryList(src);

            await removeDirectory(dist);

            for (const directory of directories) {
                const distDir = `${dist}/${directory}`;

                const files = await imagemin([`${directory}/*.png`], {
                    destination: distDir,
                    plugins: [
                        imageminPngquant({
                            quality: [0.6, 0.8],
                            verbose: true
                        })
                    ]
                });


                files.map((file) => {
                    return console.log(
                        clc.blue("🗜️  Compressed image:"),
                        file.destinationPath
                    );
                });
            }

            console.log(clc.yellow("🎉 Compressed all images:"), dist);

        });
})();

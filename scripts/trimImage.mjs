import { globby } from "globby";
import clc from "cli-color";
import fs from "fs";
import inquirer from "inquirer";
import trimImage from "trim-image";

import { removeDirectory } from "./modules/removeDirectory.mjs";

const config = {
    src: "src",
    dist: "dist"
};

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

            await removeDirectory(dist);


            const files = await globby(src, {
                expandDirectories: {
                    extensions: ["png"]
                }
            });

            await Promise.all(files.map(async (file) => {

                const targetPath = storePath(file);
                const distPath = `${dist}/${targetPath}`;
                const pngFile = fileName(file);
                const distFile = `${distPath}/${pngFile}`;

                return await fs.promises.mkdir(distPath, { recursive: true })
                    .then(() => {
                        trimImage(file, distFile, (error) => {
                            if (error) {
                                return error;
                            }
                        });
                        console.log(clc.blue("✂️  Trimmed image:"), distFile);
                    }).catch(error => {
                        return error;
                    });
            }));

            console.log(clc.yellow("🎉 Trimmed all images:"), dist);

        });
})();

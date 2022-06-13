const clc = require("cli-color");
const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");
const inquirer = require("inquirer");

const { cleanDirectory } = require("./modules/cleanDirectory.js");
const { createDirectoryList } = require("./modules/createDirectoryList.js");

const config = {
    src: "dist",
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

            // ディレクトリリストの取得
            const directoryList = createDirectoryList(src);

            // 出力ディレクトリの初期化
            await cleanDirectory(dist);

            // 減色の実行
            for (const directory of directoryList) {
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
                        clc.blue("Compressed image:"),
                        file.destinationPath
                    );
                });
            }

            console.log(clc.yellow("🎉 Compressed images."));

        });
})();

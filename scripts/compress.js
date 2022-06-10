const clc = require('cli-color');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

const { cleanDirectory } = require('./modules/cleanDirectory.js');
const { createDirectoryList } = require('./modules/createDirectoryList.js');

const config = {
    src: 'dist',
    dist: 'compressed',
};


(async () => {
    const src = config.src;
    const dist = config.dist;

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

    console.log(clc.yellow("🎉 Optimized images."));
})();

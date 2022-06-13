const fs = require("fs-extra");
const clc = require("cli-color");

/**
 * 対象ディレクトリ以下のファイル・ディレクトリの削除
 * @param targetDirectory 対象ディレクトリ
 */
module.exports.cleanDirectory = async (
    targetDirectory
) => {
    try {
        fs.remove(targetDirectory, (error) => {
            if (error) {
                return console.error(error);
            }

            fs.mkdirp(targetDirectory, (error) => {
                if (error) {
                    return console.error(error);
                }

                return console.log(
                    clc.yellow("📁 Finished clean up target directory:"),
                    targetDirectory
                );
            });
        });
    } catch (error) {
        return console.error(error);
    }
};

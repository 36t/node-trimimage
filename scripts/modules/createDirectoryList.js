const fs = require("fs");

/**
 * 対象ディレクトリ以下のディレクトリリスト（サブディレクトリ含む）の生成
 * @param targetDirectory 対象ディレクトリ
 * @returns ディレクトリリスト
 */
module.exports.createDirectoryList = (targetDirectory) => {
    const checkSubDirectory = (targetDirectory) => {
        const readDirectory = fs
            .readdirSync(targetDirectory, { withFileTypes: true })
            .filter((directory) => directory.isDirectory());

        if (readDirectory.length === 0) {
            return targetDirectory;
        }

        return readDirectory
            .map((path) => checkSubDirectory(`${targetDirectory}/${path.name}`))
            .flat();
    };

    return [targetDirectory, ...checkSubDirectory(targetDirectory)];
};

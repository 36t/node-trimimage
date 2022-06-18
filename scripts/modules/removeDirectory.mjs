import trash from "trash";
import clc from "cli-color";

export const removeDirectory = async (
    targetDirectory
) => {
    await trash(targetDirectory);

    console.log(
        clc.yellow("🧹 Moved the target directory to the trash:"),
        targetDirectory
    );
};


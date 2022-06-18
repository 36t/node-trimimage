import { globby } from "globby";

export const directoryList = async (targetDirectory) => {
    const files = await globby(targetDirectory);
    const directories = files.map(file => file.split("/").slice(0, -1).join("/"));
    const uniqueDirectories = [...new Set(directories)].sort();
    return uniqueDirectories;
};

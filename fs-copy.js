const fsPromise = require('./fs-promise');

const rp = (argName, type) => {
	throw new Error(`${argName}<${type}> is required.`);
}

const copy = (srcFile, destFile = rp('destFile', 'string')) => {
	const fileParts = destFile.split('/');
	const fileName = fileParts.pop();
	const dirPath = fileParts.join('/');

	// before anything, check to see if destFile dir exists
	const validate = fsPromise.fileCheckDir(dirPath);

	// first, read the file
	const read = validate.then(() => fsPromise.fileRead(srcFile));

	// then, write the file
	const write  = read.then((fileContent) => {
		return fsPromise.fileWrite(destFile, fileContent);
	});

	// return promise
	return write ;
};

module.exports = {
	fileCopy: copy
};

const fs = require('fs');
const mkdirp = require('mkdirp');
    
const read = (filePath, encoding='utf8') => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, encoding, (err, fileContents) => {
			if (err) { reject(err); }
			else { resolve(fileContents); }
		});
	});
};

const write = (filePath, data, encoding = 'utf8') => {
	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, data, encoding, (err) => {
			if (err) { reject(err); }
			else { resolve(true); }
		});
	});
};

const deleteFile = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.unlink(filePath, (err) => {
			if (err) { reject(err); }
			else { resolve(true); }
		});
	});
};

const checkDir =  (path) => {
	return new Promise((resolve, reject) => {
		mkdirp(path, function (err) {
		    if (err) reject(err)
		    else resolve(true);
		});
	});
};

const writeWithValidation = (filePath, data, encoding = 'utf8') => {
	return checkDir(filePath).then(() => write(filePath, data));
};

module.exports = {
	fileRead: read,
	fileWrite: write,
	fileDelete: deleteFile,
	fileCheckDir: checkDir,
};

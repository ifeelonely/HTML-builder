
const fs = require('fs');
const { mkdir } = require('fs/promises');
const path = require('path');

const mergeStyles = function(cssName, __dirname){
    const srcFolder = path.join(__dirname, 'styles');
    const filesPaths = [];
    const dataArray = [];

    fs.promises.readdir(srcFolder).then((files, err) => {
    if(err) throw new Error('Can not read folder!');

    for(const file of files) {
      if(path.extname(file) === '.css')
        filesPaths.push(path.join(srcFolder, file));
    }

    return fs.promises.writeFile(path.join(__dirname, 'project-dist', `${cssName}.css`), '');
  }).then(() => {
    for(let i = 0; i < filesPaths.length; i++) {
      const readableStream = fs.createReadStream(filesPaths[i], 'utf-8');
      dataArray.push('');
      readableStream.on('data', chunk => dataArray[i] += chunk.toString());
      readableStream.on('end', () => fs.promises.writeFile(path.join(__dirname, 'project-dist', `${cssName}.css`), dataArray.join('')));
    };
  });
};

module.exports = {mergeStyles};
mergeStyles('bundle', __dirname);

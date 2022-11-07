const fs = require('fs');
const path = require('path');

const copyDir = function(__dirname, destFolder, srcFolder) {
  const folderPath = path.join(__dirname, `${srcFolder}`);

  fs.mkdir(path.join(__dirname, `${destFolder}`), {recursive: true}, (err) => {
    if(err) throw new Error('Something went wrong!');
    
    fs.readdir(folderPath, (err, files) => {
      for(const file of files) {
        const filePath = path.join(folderPath, file);
        fs.copyFile(filePath, path.join(__dirname, `${destFolder}`, file), (err) => {
            if(err) throw new Error('Can not copy the file');
        });
      };
    });
  });
};

copyDir(__dirname, 'files-copy', 'files');

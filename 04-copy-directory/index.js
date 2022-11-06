const fs = require('fs');
const path = require('path');

const copyDir = function() {
  const folderPath = path.join(__dirname, 'files');

  fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (err) => {
    if(err) throw new Error('Something went wrong!');
    
    fs.readdir(folderPath, (err, files) => {
      for(const file of files) {
        const filePath = path.join(folderPath, file);
        fs.copyFile(filePath, path.join(__dirname, `files-copy`, file), (err) => {
            if(err) throw new Error('Can not copy the file');
        });
      };
    });
  });
};

copyDir();
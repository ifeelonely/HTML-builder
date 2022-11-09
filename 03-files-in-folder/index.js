const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, `secret-folder`);
fs.readdir(folderPath, (err, files) => {
    for(const file of files) {
        let filePath = path.join(__dirname, `secret-folder`, file);
        fs.stat(filePath, {}, (err, stats) => {
          if(stats.isFile()) 
            console.log(`${file.split('.').join(' - ')} - ${(stats.size / 1024).toFixed(1)}кб`);
        });
    }; 
});




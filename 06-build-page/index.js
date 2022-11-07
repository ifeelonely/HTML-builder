const fs = require('fs');
const path = require('path');
const {mergeStyles} = require('../05-merge-styles/index');
const { mkdir } = require('fs/promises');

let templateData = '';
let componentsPath = [];
let componentsName = [];
let dataArray = [];

fs.promises.mkdir(path.join(__dirname, 'project-dist'), {recursive: true})
.then(() => {
  return fs.promises.readFile(path.join(__dirname, 'template.html'));
})
.then((data) => {
  templateData = data.toString();
  return fs.promises.readdir(path.join(__dirname, 'components'));
})
.then((data) => {
  componentsPath = data;
  componentsName = [].concat(data);
  for(let i = 0; i < componentsPath.length; i++) 
    componentsPath[i] = path.join(__dirname,'components', componentsPath[i]);
    return fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '');
})
.then(() => {
  return new Promise((resolve) => {
    for(let i = 0; i < componentsPath.length; i++) {
        const readableStream = fs.createReadStream(componentsPath[i], 'utf-8');
        dataArray.push('');
        readableStream.on('data', chunk => dataArray[i] += chunk.toString());
        readableStream.on('end', () => resolve());
      } 
  })    
}).then(() => {
    for(let i = 0; i < dataArray.length; i++) {
      templateData = templateData.replace(`{{${componentsName[i].split('.')[0]}}}`, dataArray[i]);
    }
    return fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), templateData);
}).then(() => {
    mergeStyles('style', __dirname);
    copyFolderRecursevily(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
});

const copyFolderRecursevily = function(src, target) {
  fs.readdir(src, (err, files) => {
    for(const file of files) {
      let curPath = path.join(src, file);
      fs.stat(curPath, {}, (err, stats) => {
        if(stats.isDirectory()) {
          fs.promises.mkdir(path.join(target, file), {recursive: true}).then(() => {
            let ftTarget = path.join(target, file);
            copyFolderRecursevily(path.join(curPath), path.join(ftTarget));
          });
        } 
        if(stats.isFile()) {
          fs.copyFile(curPath, path.join(target, file), err => {
            if(err) console.log('Can not copy!')
            }
          );
        }
      })
    }
  });
};





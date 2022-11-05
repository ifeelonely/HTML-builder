const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'output.txt'));
stdout.write('Hi, what do you have to say?\n')
stdin.on('data', data => {
    let str = data.toString();
    if(str.trim() == 'exit') process.exit();
    output.write(data)
});
process.on('exit', () => console.log('Bye!'));
process.on('SIGINT', () => process.exit());



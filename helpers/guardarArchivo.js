const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = (data) =>{

    fs.writeFileSync(archivo, JSON.stringify(data) );
}

const leerDB = () => {
    if(fs.existsSync(archivo));

    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    console.log(info);

}
module.exports = {
    guardarDB,
    leerDB
}
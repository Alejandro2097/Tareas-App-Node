require('colors');

const { guardarDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() => {

    const tareas = new Tareas();

    let opt = '';

    do{
        // Imprimir el menu
       opt = await inquirerMenu();
       switch(opt){
            case '1':
               //crear opcion
               const desc = await leerInput('Descripcion: ');
               tareas.crearTarea(desc);
            break;

            case '2':
                console.log(tareas.listadoArr);
            break;


        }    
        // guardarDB(tareas.listadoArr);
        await pausa();
    }while( opt !== '0')                                                                  
} 

main();
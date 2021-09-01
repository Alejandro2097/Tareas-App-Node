require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async() => {


    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        //Establecer las tareas.
        //cargar tareas.
        tareas.cargarTareasFromArray(tareasDB);
    }
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
                tareas.listadoCompleto();
            break;


        }    
        guardarDB(tareas.listadoArr);
        await pausa();
    }while( opt !== '0')                                                                  
} 

main();
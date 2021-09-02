require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheck
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

            case '3'://Listar completadas
                tareas.listarPendientesCompletados(true);
            break;

            case '4'://Listar pendientes
                tareas.listarPendientesCompletados(false);
            break;
            case '5': // completado o pendiente
                const ids = await mostrarListadoCheck(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('\nTarea borrada'.blue);
                    }
                }
            break;


        }    
        guardarDB(tareas.listadoArr);
        await pausa();
    }while( opt !== '0')                                                                  
} 

main();
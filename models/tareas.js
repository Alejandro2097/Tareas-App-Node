const Tarea = require('./tarea');
require('colors');

class Tareas{
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
            
        })

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    cargarTareasFromArray( tareas = []){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
        
    }


    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    listadoCompleto(){
        let cont = 1;
        for(let i = 0; i< this.listadoArr.length; i++){
            let cnt = i +1;
            if(this.listadoArr[i].completadoEn != null){
                console.log(`${cnt.toString().green + '.'.green} ${this.listadoArr[i].desc.green}  ::: || Completada`);
            }else{
                console.log(`${cnt.toString().green + '.'.green} ${this.listadoArr[i].desc.red}  ::: || Pendiente`);
            }
            cont ++;
        }
         
    }
}

module.exports = Tareas;
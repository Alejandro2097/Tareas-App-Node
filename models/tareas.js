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

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
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
        for(let i = 0; i< this.listadoArr.length; i++){
            let cnt = i +1;
            if(this.listadoArr[i].completadoEn != null){
                console.log(`${cnt.toString().green + '.'.green} ${this.listadoArr[i].desc}  ::: || ${'Completada'.green}`);
            }else{
                console.log(`${cnt.toString().green + '.'.green} ${this.listadoArr[i].desc}  ::: || ${'Pendiente'.red}`);
            }
        }
         
    }
    listarPendientesCompletados( completadas = true){
        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea, i) =>{
            const {desc, completadoEn } = tarea;
            const estado = (completadoEn)
                        ? 'Completada'.green
                        : 'Pendiente'.red
            if(completadas ){
                //mostrar completadas
                if(completadoEn){
                    contador += 1;
                    console.log(`${contador.toString().green + '.'.green} ${desc} :: ${completadoEn.green}`)
                }
            }else{
                if(!completadoEn){
                    contador += 1;
                    console.log(`${contador.toString().green + '.'.green} ${desc} :: ${estado}`)
                }
            }
        });
       
    }
    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toString();
            }
        });
        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;
//Funcion para agregar al localstorage
let tareaAeditar = null;

function GuardarTarea() {
    const tarea = document.getElementById("tarea").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const descripcion = document.getElementById("descripcion").value;



    let numeroTarea = Number(localStorage.getItem("contador")) || 1; 
    const llave = `llave_${numeroTarea}`;

    
    localStorage.setItem(`${llave}_tarea`, tarea);
    localStorage.setItem(`${llave}_fecha`, fecha);
    localStorage.setItem(`${llave}_hora`, hora);
    localStorage.setItem(`${llave}_descripcion`, descripcion);

    
    localStorage.setItem("contador", numeroTarea + 1);
    
    document.getElementById("formulario").reset();

    CargarTareas()
}



function CargarTareas() {
    let lista = Number(localStorage.getItem("contador")) || 1;
    let divConTareas = document.getElementById("listar")

    divConTareas.innerHTML = ""

    for (let i = 1; i < lista; i++) {
        const llave = `llave_${i}`;

        const tarea = localStorage.getItem(`${llave}_tarea`);
        
        const fecha = localStorage.getItem(`${llave}_fecha`);
        const hora = localStorage.getItem(`${llave}_hora`);
        const descripcion = localStorage.getItem(`${llave}_descripcion`);
         
        if (!tarea || !fecha || !hora || !descripcion) {
            continue; // validacion para no cargar datos null inexistentes
        }

    let tareasLista =  `
                    <div class="tarea">
                    <p><strong>${tarea}</strong> - ${descripcion}</p>
                    <p>${fecha} - ${hora}</p>
                    <div class="btns">

                        <button class="btn-actualizar" onclick="Actualizar('${llave}')">Actualizar</button>
                        
                        <button class="btn-borrar" onclick="EliminarLista('${llave}')">Eliminar</button>
                    </div>`

    divConTareas.innerHTML += tareasLista

    }
}

function EliminarLista(llave) {
    //En esta funcion realizamos la eliminacion de la tarea insertada
    localStorage.removeItem(`${llave}_tarea`);
    localStorage.removeItem(`${llave}_fecha`);
    localStorage.removeItem(`${llave}_hora`);
    localStorage.removeItem(`${llave}_descripcion`);

   

    let tareaDiv = document.getElementById(llave);
    if (tareaDiv) {
        tareaDiv.remove(); //Aqui se borra el Div que contine la tarea
    }

  
    CargarTareas(); //actualizo tarea
 
}

function Actualizar(llave) {
    //En esta funcion llamamos los campos a modificar insertados de la tarea

    const tarea = localStorage.getItem(`${llave}_tarea`);
    const fecha = localStorage.getItem(`${llave}_fecha`);
    const hora = localStorage.getItem(`${llave}_hora`);
    const descripcion = localStorage.getItem(`${llave}_descripcion`);

    document.getElementById("tarea").value = tarea;
    document.getElementById("fecha").value = fecha;
    document.getElementById("hora").value = hora;
    document.getElementById("descripcion").value = descripcion;

  
    tareaAEditar = llave; //se guarda la llave del campo a modificar
}

function Modificar(llave){
    // En esta funcion realizamos la modificacion de los campos llamados en  Actualizar 
    // validacion para editar no en vacio
    if (!tareaAEditar) {
        alert("No has seleccionado ninguna tarea para modificar");
        return;
    }

    const tarea = document.getElementById("tarea").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const descripcion = document.getElementById("descripcion").value;


     // Actualizar en localStorage con los cambios
    localStorage.setItem(`${tareaAEditar}_tarea`, tarea);
    localStorage.setItem(`${tareaAEditar}_fecha`, fecha);
    localStorage.setItem(`${tareaAEditar}_hora`, hora);
    localStorage.setItem(`${tareaAEditar}_descripcion`, descripcion);

    
   
    document.getElementById("formulario").reset();
    tareaAEditar = null; // se reinicia la variable
    CargarTareas()

}




window.onload = function () {
    CargarTareas()
}
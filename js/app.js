// CAMPOS DEL FORMULARIO
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');


// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

// CLASES
class Citas{
    constructor(){
        this.test = [];
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id){
        this.citas = this.citas.filter( (cita)=> cita.id !== id  );
    }

    editarCita(citaAct){
        this.citas = this.citas.map( (cita)=> cita.id === citaAct.id ? citaAct : cita);
    }
}

class UI{
    
    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('DIV');
         divMensaje.classList.add( 'text-center', 'alert', 'd-block', 'col-12' );

         if( tipo === 'error' ){
            divMensaje.classList.add('alert-danger');

         }else{
            divMensaje.classList.add('alert-success');
         }

         //Mensaje de error
         divMensaje.textContent = mensaje;

         //Agregar al DOM
         const contenido = document.querySelector('#contenido');
         if( contenido.children[0].classList.contains('alert-danger') ){
            return;
         }

        contenido.insertBefore(divMensaje, document.querySelector('.agregar-cita'));
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas({citas}){

        this.limpiarHTML();
        
        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id  } = cita;

            const divCita = document.createElement('DIV');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting elementos de cita
            const mascotaParrafo = document.createElement('H2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('P');
            propietarioParrafo.innerHTML = ` <span class="font-weight-bolder">Propietario: </span> ${propietario} `;

            const telefonoParrafo = document.createElement('P');
            telefonoParrafo.innerHTML = ` <span class="font-weight-bolder">Telefono: </span> ${telefono} `;

             const fechaParrafo = document.createElement('P');
            fechaParrafo.innerHTML = ` <span class="font-weight-bolder">Fecha: </span> ${fecha} `;

             const horaParrafo = document.createElement('P');
            horaParrafo.innerHTML = ` <span class="font-weight-bolder">Hora: </span> ${hora} `;

             const sintomasParrafo = document.createElement('P');
            sintomasParrafo.innerHTML = ` <span class="font-weight-bolder">Sintomas: </span> ${sintomas} `;

            // Boton para eliminar cita
            const btnEliminar = document.createElement('BUTTON');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`
            btnEliminar.onclick = ()=> eliminarCita(id);

            //Boton para EDITAR cita
            const btnEditar = document.createElement('BUTTON');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>`
            btnEditar.onclick = ()=> cargarEdicion(cita);

            //Agregar los parrafos al div cita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);



            //agregar al HTML
            contenedorCitas.appendChild(divCita);

        });
    
    }

    limpiarHTML(){
       
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}


const ui =  new UI();
const administrarCitas = new Citas();

// Registrar eventos
eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);

}

// Objeto principal con info de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//Agrega datos al objeto de cita.
function datosCita(e){
    //Para que esta tecnica funcione, debes tener definido en HTML
    // un atributo 'name' con el mismo valor del nombre de tu objeto (citaObj)
    citaObj[e.target.name] = e.target.value;
}

//Valida y agrega una nueva cita a clase Citas
function nuevaCita(e){
    e.preventDefault();

    //extraer info de objeto.
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    //Validar campos
    if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado correctamente');

        // Pasar el objeto a edicion.
        administrarCitas.editarCita({...citaObj})

        formulario.querySelector( 'button[type="submit"]' ).textContent = 'Crear Cita';
        editando = false
    }else{
        //generar id
        citaObj.id = Date.now();
        //creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        ui.imprimirAlerta('Se agrego correctamente')
    }

   
    reiniciarObjeto();
    formulario.reset();
    //Agregar cita al HTML
    ui.imprimirCitas(administrarCitas);
}

/**
 * Cuando agregamos una cita al arreglo this.citas, le estamos pasando
 * la misma referencia del objeto global citaObj, por ende cada que se
 * modifica estamos agregando una referencia al mismo objeto en cada posicion
 * del arreglo.
 * 
 */

function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}

function eliminarCita(id){
    //Eliminar del arreglo
    administrarCitas.eliminarCita(id);

    // Imprimir alerta
    ui.imprimirAlerta('Cita Eliminada correctamente');

    // Iterar nuevamente sobre arreglo
    ui.imprimirCitas(administrarCitas);
}

// Carga datos y modo edicion.
function cargarEdicion(cita){
    console.log(cita);
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //Llenar los inputs con la info a editar.
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar objeto global que valida
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;


    //Cambiar el texto del boton formulario
    formulario.querySelector( 'button[type="submit"]' ).textContent = 'Guardar Cambios';

    editando = true;

}
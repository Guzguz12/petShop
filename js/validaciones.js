//seleciona el input por el id 
//const inputNacimiento = document.querySelector("#birth");
//funcion que nos trae los evenetos del target
/*const validarFecha = (evento) => 
{
    //llama a la funcion y le pasamos el evento target- todo lo del input date
    validarNacimiento(evento.target) ;
}*/

//la funcion valida recibe el input 
export function valida (input)
{
    //almacena todos los data pero esta vez el de tipo o sea el de inputDate
    const tipoDeInput = input.dataset.tipo;
    //si dentro de validadores existe el tipodeInput o sea si existe nacimiento
    if(validadores[tipoDeInput])
    {
        // se le asigan el input que esta validando del objeto validadores
        validadores[tipoDeInput](input);
    }
    //valido el input y si el validity es valido remuevo la clase del css que dice que es invalido
    if(input.validity.valid)
    {
        //recordar que el estilo se le aplica al div o sea al padre 
        input.parentElement.classList.remove("input-container--invalid");
        //Selecciono la clase del estilo elemento span para vaciar su contenido
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    }else//sino agrego la clase que muestra el div invalido
    {
        //recordar que el estilo se le aplica al div o sea al padre 
        input.parentElement.classList.add("input-container--invalid");
        //si hay error lo personalizamos
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeError(tipoDeInput,input);
    }
}

//arreglo de tipo de errores
const tipoErrores =
[
    "valueMissing","typeMismatch","patternMismatch","customError"
];
//objeto para mostrar errores
const mensajeError =
{
    nombre:{
        valueMissing:"Este campo no puede estar vacío"
    },
    email:{
        valueMissing:"Este campo no puede estar vacío",
        typeMismatch:"El correo no es válido"
    },
    password:{
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch:"Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento :{
        valueMissing:"Este campo no puede estar vacío",
        customError:"Debes ser mayor de edad"
    },
    telefono:{
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch:"El formato requerido es XXXXXXXXXX 10 números"
    },
    direccion:{
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch:"La dirección debe contener entre 10 a 40 caracteres."
    },
    ciudad :{
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch:"La ciudad debe contener entre 10 a 40 caracteres."
    },
    estado:{
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch:"El estado debe contener entre 10 a 40 caracteres."
    }
};

//funcion que mostrar el objeto de mensaje error
function mostrarMensajeError (tipoDeInput, input)
{
    let mensaje="";
    //recorrer los tipo de errores
    tipoErrores.forEach (error =>
        {
            //valida si las funciones de validity estan true
           if(input.validity[error])
           {
            //asigna el mensaje al tipo deinput nombre,email,password y le asigna el error valuemissing, typemismatch, patternmismatch
                mensaje= mensajeError[tipoDeInput][error];
           }
        })
    return mensaje;
}


//objeto validadores
const validadores =
{
    //a data-tipo de input Date, llamara a la funcion ValidarNacimiento
    nacimiento: (input) => validarNacimiento(input),
};
//del target traemos el valor de la fecha seleccionada
function validarNacimiento (input)
{
    const fechaCliente = new Date(input.value);
    //llamada a la funcion
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente))
    {
        mensaje="Debes tener al menos 18 años";
        
    }
    //al input se le agrega la validacion y saldrá el texto 
    input.setCustomValidity(mensaje);
    
}
//llama a validar cuando se deja de seleccionar la fecha
//inputNacimiento.addEventListener("blur",validarFecha);

function mayorDeEdad(fechaCliente)
{
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fechaCliente.getUTCFullYear()+18, 
        fechaCliente.getUTCMonth(), 
        fechaCliente.getUTCDate())
    return diferenciaFechas<= fechaActual
}
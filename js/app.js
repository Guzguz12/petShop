import { valida } from "./validaciones.js";   
//selecciona todos los tipos inputs y los guarda
const inputs =document.querySelectorAll("input") ;

// recorre todos los inputs y al que debe de agregar la funcion blur
//
inputs.forEach( input =>
    {
        //a cada input le agrega la funcion blur y cuando salga llama a la funcion valida
        input.addEventListener("blur", (input)=>{
            valida(input.target);
        })
    })
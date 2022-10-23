/*
No es buena practica usar en el archivo principal de codigo console.log
 y console.error para imprimir lo errores
entonces en este modulo crearemos los optus de logins
*/

//esta funcion sirve para imprimir mensaje de registrp normales 
const info = (...params) => {
  //we modify this to don't print in test mode
  if (process.env.NODE_ENV !== 'test'){
    console.log(...params)
  }
  }
  
  const error = (...params) => {
    if (process.env.NODE_ENV !== 'test'){
      console.error(...params)
    }
  }
  
  module.exports = {
    info, error
  }
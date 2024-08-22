const d = document;
const textArea = d.querySelector(".form__input");
const imagenMuneco = d.querySelector(".result__img");
const imagenEncriptado = d.querySelector(".result__img__encriptado");
const imagenDesencriptado = d.querySelector(".result__img__desencriptado");
const loaderGamer = d.querySelector(".loader");
const resultTitle = d.querySelector(".result__title");
const resultText = d.querySelector(".result__text");
const botonEncriptar = d.querySelector(".form__btn");
const botonDesencriptar = d.querySelectorAll(".form__btn");
const botonCopiar = d.querySelector(".result__btn");
const botonLimpiar = d.querySelector(".limpiar__btn")
let textoOriginal = "";

const llaves = [
	["e", "enter"],
	["i", "imes"],
	["a", "ai"],
	["o", "ober"],
	["u", "ufat"],
];

//Funcion para encriptar el mensaje
function encriptarMensaje(mensaje){
    let mensajeEncriptado = "";
    for(let i = 0; i < mensaje.length; i++){
        let letra = mensaje[i];
        let encriptada = letra;
        for(let j=0; j < llaves.length; j++){           
            if (letra ===llaves[j][0]){
                encriptada = llaves[j][1];//Reemplaza la letra por el parametro de encriptacion
                break;//Termina el bucle
            }  
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
};

//funcion para desencriptar el mensaje
function desencriptarMensaje(mensaje) {
   let mensajeDesencriptado = mensaje;
   for(let i = 0; i < llaves.length; i++){
        let regex = new RegExp(llaves[i][1], "g");
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
   }
   return mensajeDesencriptado;
};

//Area de texto para modificar mientras se ingresa el texto, ocultar elementos dinamicamente
textArea.addEventListener("input", (e)=>{
    imagenMuneco.style.display = "none";
    //console.log(e.target.value);
    loaderGamer.classList.remove("hidden");
    resultTitle.textContent = "Recolectando Mensaje";
    resultText.textContent = "Created by Alejandro Moreno";
});

//funcion Boton Encriptar
botonEncriptar.addEventListener("click", (e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    if (mensaje.trim() === "") {
        resultText.textContent=("El campo de texto está vacío. Por favor, ingresa un mensaje para encriptar.");
        return; // Sale de la función si el campo está vacío
    }
    let mensajeEncriptado = encriptarMensaje(mensaje);
    resultText.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    resultTitle.textContent = "Tu mensaje es:";
    loaderGamer.classList.add("hidden");
    imagenEncriptado.style.display = "block";
    imagenDesencriptado.style.display = "none";
});

//funcion Boton Desecriptar
botonDesencriptar[1].addEventListener("click", (e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    if (mensaje.trim() === "") {
        resultText.textContent= "El campo de texto está vacío. Por favor, ingresa un mensaje para desencriptar.";
        return; // Sale de la función si el campo está vacío
    }
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultText.textContent = mensajeDesencriptado;
    botonCopiar.classList.remove("hidden");
    resultTitle.textContent = "Tu mensaje es:";
    loaderGamer.classList.add("hidden");  
    imagenDesencriptado.style.display = "block";
    imagenEncriptado.style.display = "none";
});

//funcion Booton Copiar
botonCopiar.addEventListener("click", (e)=>{
    let textoCopiado = resultText.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=>{
       // console.log(`se copio el texto: ${textoCopiado}`)
       imagenMuneco.style.display = "block";
       imagenEncriptado.style.display = "none";
       imagenDesencriptado.style.display = "none";
       loaderGamer.classList.add("hidden");
       resultTitle.textContent = "El mensaje fue Copiado";
       botonCopiar.classList.add("hidden")
       resultText.textContent = "Created by Alejandro Moreno"
       textArea.value = "";
       
    })
});

// Funcion Boton Limpiar
botonLimpiar.addEventListener("click", (e) => {
    e.preventDefault();
    textArea.value = ""; // Limpia el contenido del textArea
    resultText.textContent = "Created by Alejandro Moreno";
    imagenMuneco.style.display = "block";
    imagenEncriptado.style.display = "none";
    imagenDesencriptado.style.display = "none";
    loaderGamer.classList.add("hidden");
    botonCopiar.classList.add("hidden");
});

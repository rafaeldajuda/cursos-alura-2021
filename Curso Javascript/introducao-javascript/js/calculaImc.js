var titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";

var pacientes = document.querySelectorAll(".paciente");

for(var i = 0; i < pacientes.length; i++){
    
    var paciente = pacientes[i];

    var tdPeso = paciente.querySelector(".info-peso");
    var tdAltura = paciente.querySelector(".info-altura");
    var tdIMC = paciente.querySelector(".info-imc");

    var peso = tdPeso.textContent
    var altura = tdAltura.textContent;

    var pesoEhValido = validaPeso(peso);
    var alturaEhValido = validaAltura(altura);

    if(!pesoEhValido){
        pesoEhValido = false;
        tdIMC.textContent = "peso inválido";
        paciente.classList.add("paciente-invalido");
    }

    if(!alturaEhValido){
        alturaEhValido = false;
        tdIMC.textContent = "altura inválida";
        paciente.classList.add("paciente-invalido");
    }

    if(alturaEhValido == true && pesoEhValido == true){
        var imc = calculaImc(peso, altura);
        tdIMC.textContent = imc;
    }
}

function validaPeso(peso){
    if(peso >= 0 && peso < 100){
        return true;
    }else{
        return false;
    }
}

function validaAltura(altura){
    if(altura > 0 && altura <= 3){
        return true;
    }else{
        return false;
    }
}

function calculaImc(peso, altura){
    var imc = 0;

    imc = peso / (altura * altura);

    return imc.toFixed(2);
}
var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){ 
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");

    // Extraindo informacoes do paciente form
    var paciente = obtemPacienteDoFormulario(form);

    var erros = validaPaciente(paciente);
    console.log(erros);
    if(erros.length > 0){
        exibeMensagensDeErro(erros);
        return;
    }  

    adicionaPacienteNaTabela(paciente);

    // limpa o form
    form.reset();
    document.querySelector("#mensagens-erro").innerHTML = "";

});

function adicionaPacienteNaTabela(paciente){
    // cria a tr e td do paciente
    var pacienteTr = montaTr(paciente);

    // adicionando o paciente na tabela 
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function exibeMensagensDeErro(erros){
    var ul = document.querySelector('#mensagens-erro');
    console.log("teste")

    //PERMITE MANIPULAR O HTML INTERNO DE UM ELEMENTO
    ul.innerHTML = "";

    erros.forEach(function(erro){
        var li = document.createElement('li');
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form){
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.querySelector("#gordura").value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente){
     //CRIAR UM ELEMENTO HTML
     var pacienteTr = document.createElement("tr");
     pacienteTr.classList.add('paciente');
 
     //ADIOCINA UM ELEMENTO FILHO AO ELEMENTO
     pacienteTr.appendChild(montaTd(paciente.nome, 'info-nome'));
     pacienteTr.appendChild(montaTd(paciente.peso, 'info-peso'));
     pacienteTr.appendChild(montaTd(paciente.altura, 'info-altura'));
     pacienteTr.appendChild(montaTd(paciente.gordura, 'info-gordura'));
     pacienteTr.appendChild(montaTd(paciente.imc, 'info-imc'));

     return pacienteTr;
}

function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe)

   return td;
}

function validaPaciente(paciente){
    var erros = [];

    if(paciente.nome.length == 0) erros.push("O nome não pode ser em branco!");
    if(!validaPeso(paciente.peso)) erros.push("Peso é inválido!");
    if(!validaAltura(paciente.altura)) erros.push("Altura é inválida!");
    if(paciente.gordura.length == 0) erros.push("A gordura não pode ser em branco!");
    if(paciente.peso.length == 0) erros.push("O peso não pode ser em branco!");
    if(paciente.altura.length == 0) erros.push("A altura não pode ser em branco!");

    return erros;
}

/*
    QUANDO ACONTECE UM EVENTO É POSSÍVEL CAPTURAR A VARIAVEL 'EVENT'

    event.preventDefault(); - IMPEDE O COMPORTAMENTO PADRÃO DO EVENTO
*/

/*
//FUNÇÃO ANÔNIMA
titulo.addEventListener("click", function (){
    console.log("Sou uma função anônima!!!");
});


titulo.addEventListener("click", mostraMensagem);

function mostraMensagem(){
    console.log("Olá Mundo!!!");
}
*/

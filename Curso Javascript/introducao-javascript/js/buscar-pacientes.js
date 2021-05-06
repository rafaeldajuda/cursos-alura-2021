var botaAdicionar = document.querySelector("#buscar-pacientes");

var api = {
    metodo: "GET",
    url: "https://api-pacientes.herokuapp.com/pacientes"
}

botaAdicionar.addEventListener("click", () =>{
    console.log("buscando pacientes...");

    //OBJETO RESPONSAVEL POR FAZER REQUISICOES
    var xhr = new XMLHttpRequest();

    //O METODO OPEN ABRE UMA CONEXAO
    xhr.open(api.metodo, api.url);

    //O METODO SEND FAZ A REQUISICAO
    xhr.send();

    //PARA VER O VER E PEGAR A RESPOSTA É PRECISO ADD UM EVENTO (EVENTO --> LOAD)
    xhr.addEventListener("load", () => {
        var erroAjax = document.querySelector("#erro-ajax");
        if(xhr.status == 200){
            erroAjax.classList.add("invisivel");
            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);

            pacientes.forEach((paciente) => {
                adicionaPacienteNaTabela(paciente);
            });
        }else{
            console.log(xhr.status);
            console.log(xhr.responseText);

            erroAjax.classList.remove("invisivel");
        } 
    });

})
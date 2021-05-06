

var tabela = document.querySelector("#tabela-pacientes");

tabela.addEventListener("dblclick", function(event){
    /*
    var alvoEvento = event.target;
    var paiDoAlvo = alvoEvento.parentNode;
    paiDoAlvo.remove();
    */

    //ADD ANIMACAO
    event.target.parentNode.classList.add('fadeOut');

    //ESPERAR 0.5s
    setTimeout(function(){
        event.target.parentNode.remove();
    }, 500);


});



/* 
var pacientes = document.querySelectorAll('.paciente');

pacientes.forEach(function (paciente){
    paciente.addEventListener("dblclick", function(){
        console.log("Fui clicado com duplo click");
        //paciente.remove();
        this.remove();      //O THIS ESTÁ RELACIONADO AO DONO DO EVENTO
    });
});
*/

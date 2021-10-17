const custemExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const tabelas = require('./infraestrutura/tabelas');
const Tabelas = require('./infraestrutura/tabelas');

conexao.connect(erro => {
    if(erro){
        console.log(erro);
    }else{
        console.log('conectado com sucesso');
        Tabelas.init(conexao);

        const app = custemExpress();
        app.listen(3000, function(){
            console.log('servidor rodando na porta 3000');
        });
    }
});



//atendimentos(app);


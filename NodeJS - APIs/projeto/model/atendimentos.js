const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
    adicionaAtendimento(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        console.log(data);
        console.log(dataCriacao);

        //VALIDACOES
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        var validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];

        var erros = validacoes.filter(campo => !campo.valido);
        var existemErros = erros.length;


        //CONEXAO COM O BANCO - INSERT ATENDIMENTO
        if(existemErros){
            res.status(400).json(erros);
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            console.log(atendimentoDatado);

            const sql = 'INSERT INTO atendimentos SET ?';

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro);
                }else{
                    res.status(201).json(atendimento);
                }
            });
        }
        
    }

    lista(res){
        const sql = "SELECT * FROM atendimentos";

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;
        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0];
            if(erro){
                res.status(400).json(erro);
            }else{
                
                res.status(200).json(atendimento);
            }
        });
        
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }
        const sql = "UPDATE atendimentos SET ? WHERE id = ?";

        conexao.query(sql, [valores, id], (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({...valores, id});
            }
        });
    }

    deleta(id, res){
        const sql = "DELETE FROM atendimentos WHERE id = ?"

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({id});
            }
        });
    }

}

module.exports = new Atendimento;
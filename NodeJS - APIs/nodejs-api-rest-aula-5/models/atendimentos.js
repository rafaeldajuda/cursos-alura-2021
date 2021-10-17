const moment = require('moment')
const conexao = require('../infraestrutura/database/conexao')
const axios = require('axios')
const repositorio = require('../repositorios/atendimentos');

class Atendimento {
    constructor(){
        this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);
        this.clienteEhValido = ({tamanho}) => tamanho >= 5;
        
        this.valida = (parametros) => this.validacoes.filter(campo => {
            const { nome } = campo;
            const parametro = parametros[nome];

            return !campo.valido(parametro);
        });

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }

    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        const erros = this.valida(parametros);
        const existemErros = erros.length

        if(existemErros) {
            return new Promise((resolve, reject) => reject(erros));
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            
            return repositorio.adiciona(atendimentoDatado)
                .then((resultados) => {
                    const id = resultados.insertId;
                    return ({...atendimento, id});
                });
        }
       
    }

    lista() {
        return repositorio.lista();
    }

    buscaPorId(id) {

        return repositorio.buscaPorId(id)
            .then(resultados => {
                const atendimento = resultados[0]
                const cpf = atendimento.cliente;
                //const { data } = axios.get(`http://localhost:8082/${cpf}`);
                //atendimento.cliente = data;
                return atendimento;
            });
    }

    altera(id, valores) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }      

        return repositorio.altera([valores, id])
            .then(resultados => {
                return {...valores, id}
            });
    }

    deleta(id) {
        return repositorio.deleta(id)
            .then(resultados => {
                return {id}    
            });
    }
}

module.exports = new Atendimento
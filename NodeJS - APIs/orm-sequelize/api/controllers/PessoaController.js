const { PessoasServices, MatriculasServices } = require('../Services');
const pessoasServices = new PessoasServices();
const matriculaServices = new MatriculasServices();

class PessoaController {
    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
            return res.status(200).json(pessoasAtivas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessaos = await pessoasServices.pegaTodosOsRegistros();
            return res.status(200).json(todasAsPessaos);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params;
        try {
            const umaPessoa = await pessoasServices.pegaUmRegistro(Number(id));
            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await pessoasServices.criaResgistro(novaPessoa);
            return res.status(200).json(novaPessoaCriada);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaPessoa(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await pessoasServices.atualizaRegistro(novasInfos, Number(id));
            const pessoaAtualizada = await pessoasServices.pegaUmRegistro(Number(id));
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params;
        try {
            await pessoasServices.apagaRegistro(Number(id));
            return res.status(200).json({ mensagem: `id ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            const umaMatricula = await matriculaServices.pegaMatricula(Number(estudanteId), 
                Number(matriculaId));
            return res.status(200).json(umaMatricula);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params;
        const novaMatricula = { ...req.body, estudante_id: estudanteId }
        try {
            const novaMatriculaCriada = await matriculaServices.criaResgistro(novaMatricula);
            return res.status(200).json(novaMatriculaCriada);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const novasInfos = req.body;
        try {
            await matriculaServices.atualizaMatricula(novasInfos, Number(estudanteId), Number(matriculaId));
            const pessoaMatricula = await matriculaServices.pegaUmRegistro(Number(matriculaId));
            return res.status(200).json(pessoaMatricula);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await matriculaServices.apagaMatricula(Number(estudanteId), Number(matriculaId));
            return res.status(200).json({ mensagem: `id ${matriculaId} deletado` })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params;
        try {
            await pessoasServices.restauraRegistro(Number(id));
            return res.status(200).json({ mensagem: `id ${id} restaurado` });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await matriculaServices.restauraMatricula(Number(estudanteId), Number(matriculaId));
            return res.status(200).json({ mensagem: `id ${matriculaId} restaurado` });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params;
        try {
            const matriculas = await pessoasServices.pegaTodasAsMatriculas(Number(estudanteId));

            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        const { turmaId } = req.params;
        try {
            const todasAsMatriculas = await matriculaServices.pegaMatriculasPorTurma(Number(turmaId))

            return res.status(200).json(todasAsMatriculas);
            //return res.status(200).json(todasAsMatriculas.count);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async pegaTurmasLotadas(req, res) {
        const lotacaoTurma = 2;
        try {
            const turmasLotadas = await matriculaServices.pegaTurmasLotadas(lotacaoTurma)

            return res.status(200).json(turmasLotadas.count);
        } catch (error) {
            console.log(error)
            return res.status(500).json(error);
        }
    }

    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params;
        try {
            await pessoasServices.cancelaPessoasEMatriculas(Number(estudanteId));

            return res.status(200).json({ message: `matrículas ref. estudante ${estudanteId} canceladas` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = PessoaController;
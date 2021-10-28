const express = require('express');

const app = express();
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    res.status(200)
    .send({ mensagem: 'boas-vindas à API' });
});

app.listen(port, () => {
    console.log(`o servidor está rodando na porta ${port}`);
});

module.exports = app;
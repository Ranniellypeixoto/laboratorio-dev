const state = {
    cliente: {
        nome: null,
        email: null,
        cpf: null,
        endereco: {
            cep: null,
            endereco: null,
            uf: null,
            complemento: null
        }
    },
    clientes: [],
    cpfInvalido: false,
}

export default state
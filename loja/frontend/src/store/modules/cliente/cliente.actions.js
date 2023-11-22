import axios from 'axios'

const minhaApi = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        'Content-type': 'application/json'
    }
})

const brasilApi = axios.create({
    baseURL: "https://brasilapi.com.br/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

const actions = {
    cadastrar: async ({state, dispatch}) => {
         try {
             const response = await minhaApi.post("/cliente/cadastrar", state.cliente);
             dispatch("notificacao/exibir", response.data, {root: true})
         } catch (error) {
             console.error("Erro ao cadastrar cliente:", error);
         }
    },
    validaCPF: ({commit}) => {
        commit("validaCPF")
    },
    buscarCep: async ({state, commit}) => {
        console.log(state.cliente.endereco.cep);
        const response = await brasilApi.get(`/cep/v1/${state.cliente.endereco.cep}`)
        commit("atualizarEndereco", response.data)
    },
    isValidCPF: ({commit}, cliente) => {
        commit("Verificando...", cliente)
    },
    verificar: ({commit}, cliente) => {
        commit("Resultado da verificação CPF", cliente)
    },
    salvarEdicao: ({commit}, id) => {
        commit("Edição feita com sucesso", id)
    },
    deletar: async ({ dispatch }, id) => {
        const response = await minhaApi.delete(`/cliente/${id}`)
        dispatch("notificacao/exibir", response.data, {root: true})
        dispatch("listar")
    },
    listar: async ({commit}) => {
        const response = await minhaApi.get("/cliente/")
        commit("listar", response.data)
    }
}

export default actions
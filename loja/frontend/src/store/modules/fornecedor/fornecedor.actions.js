import axios from 'axios'
import router from "../../../router.js"

const minhaApi = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    'Content-Type': 'application/json'
  }
})

const actions = {
    cadastrar: async ({state, dispatch}) => {
        try {
            const response = await minhaApi.post("/fornecedor/cadastrar", state.fornecedor);          
            dispatch('notificacao/exibir', response.data, {root: true})
          } catch (error) {
            console.error("Erro ao cadastrar fornecedor:", error);
          }
    },
    validaCNPJ: ({state, dispatch }) => {
      dispatch("isValidCNPJ")
      dispatch('notificacao/exibir', "", {root: true})
      if (state.fornecedor.cnpjInvalido == false) {
        dispatch('notificacao/exibir', "CNPJ inválido", {root: true})
      }
    },
    isValidCNPJ: async ({commit, state}) => {
      var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      var c = String(state.fornecedor.cnpj).replace(/[^\d]/g, '')

      if (c.length !== 14){
        commit("cnpjInvalido", false)
        return
      }

      if (/0{14}/.test(c)){
        commit("cnpjInvalido", false)
        return
      }

      for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
      if (c[12] != (((n %= 11) < 2) ? 0 : 11 - n)){
        commit("cnpjInvalido", false)
        return
      }

      for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
      if (c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
      {
        commit("cnpjInvalido", false)
        return
      }

      commit("cnpjInvalido", true)
    },
    verificar: ({commit}, fornecedor) => {
        commit("Resultado da verificação CNPJ", fornecedor)
    },
    editar: ({commit}, id) => {
        commit("Edição feita com sucesso", id)
    },
    deletar: async ({dispatch}, id) => {
        const response = await minhaApi.delete(`/fornecedor/${id}`)
        dispatch('notificacao/exibir', response.data, {root: true})
        console.log(response.data);
        dispatch("listar")
    },
    listar: async ({commit}) => {
      const response = await minhaApi.get("/fornecedor/")      
      commit("listar", response.data)      
    },
    exibir: async ({commit}, id) => {
      const response = await minhaApi.get(`/fornecedor/${id}`)
      commit("exibir", response.data)
      router.push(`fornecedores/${id}`)
    },
    editar: async ({state, dispatch}) => {
      if (state.fornecedor.cnpjInvalido == true) {
        const response = await minhaApi.put(`/fornecedor/${state.fornecedor.id}`, state.fornecedor)
        dispatch('notificacao/exibir', response.data, {root: true})
      } else {
        dispatch('notificacao/exibir', "Não é permitido salvar com CNPJ inválido", {root: true})
      }
    }
  }

export default actions


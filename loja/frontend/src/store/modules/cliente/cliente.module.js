import mutations from "./cliente.mutations"
import actions from "./cliente.actions"
import state from "./cliente.state"

const getters = {
    cliente: state => state.cliente,
    clientes: state => state.clientes
}

export default {
    namespaced: true,
    mutations,
    actions,
    state,
    getters
}
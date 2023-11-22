<template>
    <h3>Clientes Cadastrados</h3>
    <a href="/clientes/cadastrar">Cadastrar</a>
    <br>
    <table width="100%">
        <thead>
            <th>Nome</th>
            <th>CPF</th>
            <th>E-mail</th>
        </thead>
        <tr v-for="cliente in clientes">
            <td>{{ cliente.nome }} </td>
            <td>{{ cliente.cpf }} </td>
            <td>{{ cliente.email }} </td>
            <td>
                <a @click="deletar(cliente.id)" href="#">
                    Excluir
                </a>
            </td>
            <td>
                <a @click="editar(cliente.id)" href="#">
                    Editar
                </a>
            </td>
        </tr>
    </table>
</template>

<script>

import axios from 'axios'

const minhaApi = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/json'
    }
})

import { useStore, mapGetters, mapActions } from "vuex"

export default {
    name: "ListarCliente",
    setup: () => {
        const store = useStore()
        store.dispatch("cliente/listar")
    },
    computed: {
        ...mapGetters("cliente", ["clientes"]),
    },
    methods: {
        ...mapActions("cliente", ["deletar"]),
        async editar(id) {
            this.$router.push(`/clientes/${id}`)
        }
    }
}
</script>

<style>
.listagemClientes {
    width: 50%;
    margin-left: 10px;
    padding: 10px;
    border: 1px solid rgb(108, 106, 106);
    float: left;
}
</style>
<template>
    <div class="formularioClientes">
        <h3>Editar Cliente</h3>
        <p>
            {{ notificacao }}
        </p>
        <label>Nome</label>
        <input name="nome" v-model="cliente.nome" />

        <label>E-mail</label>
        <input name="email" v-model="cliente.email" />

        <label>CPF</label>
        <input name="cpf" v-model="cliente.cpf" />

        <label>CEP</label>
        <input name="cep" v-model="cliente.cep" v-on:blur="buscarCep()" /><br>

        <label>Endereco</label>
        <input name="endereco" v-model="cliente.endereco" />

        <label>UF</label>
        <input name="uf" v-model="cliente.uf" />

        <label>Complemento</label>
        <input name="complemento" v-model="cliente.complemento" />

        <button @click="salvarEdicao()">
            Salvar
        </button>
    </div>
</template>        
    
<script>

import axios from 'axios'

const minhaApi = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/json'
    }
})

export default {
    name: "EditarCliente",
    props: ['id'],
    data() {
        return {
            cliente: {
                nome: null,
                email: null,
                cpf: null,
                cep: null,
                endereco: null,
                uf: null,
                complemento: null
            },
            notificacao: null
        }
    },
    async mounted() {
        const responce = await minhaApi.get(`/cliente/${this.id}`)
        this.cliente = responce.data
    },
    methods: {
        async salvarEdicao() {
            const responce = await minhaApi.put(`/cliente/${this.id}`, this.cliente)
            this.notificacao = responce.data
        },
        validaCPF() {
            if (this.cliente.cpf) {
                const cpf = this.cliente.cpf.replace(/[^\d]+/g, '');
                if (cpf.length !== 14 || !this.isValidCPF(cpf)) {
                    this.cpfInvalido = true;
                } else {
                    this.cpfInvalido = false;
                }
            }
        },
        isValidCPF(cpf) {
            function validaCPF(cpf) {
                var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
                var c = string(cpf).replace(/[^\d]/g, '')

                if (c.length !== 14)
                    return false

                if (/0{14}/.test(c))
                    return false

                for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
                if (c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
                    return false

                for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
                if (c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
                    return false

                return false
            }

            return validaCPF(cpf);
        },
        Verificar() {
            this.resultadoValidacao = this.isValidCPF(this.cpfToValidate) ? "Válido" : "Inválido";
        }
    },
}
</script>

<style>
.formularioClientes {
    padding: 10px;
    border: 1px solid rgb(108, 106, 106);
    float: left;
}

.formularioClientes {
    width: 25%;
    background: #efeeee;
}

.formularioClientes input {
    width: 96%;
    margin-bottom: 10px;
    font-size: 14px;
    padding: 5px;
}

.formularioClientes label {
    width: 80%;
    display: block;
    margin-right: 5px;
    text-transform: uppercase;
}

.formularioClientes button {
    background-color: aquamarine;
    border: none;
    float: right;
    width: 92px;
    height: 26px;
}
</style>
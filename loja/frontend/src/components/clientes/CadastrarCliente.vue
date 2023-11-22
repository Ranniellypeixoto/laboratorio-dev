<template>
    <div class="formularioClientes">
        <h3>Cadastro de cliente</h3>

        <label>Nome</label>
        <input name="nome" v-model="cliente.nome" />

        <label>E-mail</label>
        <input name="email" v-model="cliente.email" />

        <label>CPF</label>
        <input name="cpf" v-model="cliente.cpf" />

        <label>CEP</label>
        <input name="cep" v-model="cliente.endereco.cep" v-on:blur="buscarCep()" /><br>

        <label>Endereco</label>
        <input name="endereco" v-model="cliente.endereco.endereco" />

        <label>UF</label>
        <input name="uf" v-model="cliente.endereco.uf" />

        <label>Complemento</label>
        <input name="complemento" v-model="cliente.endereco.complemento" />

        <button @click="cadastrar()">
            Cadastrar
        </button>
    </div>
</template>        
    
<script>

import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    name: "CadastrarCliente",
    computed: {
        ...mapState("cliente", ["cliente", "cpfInvalido"]),
        ...mapGetters("cliente", ["cliente"]),
    },
    methods: {
        ...mapActions("cliente", ["cadastrar", "validaCPF", "isValidCPF", "Verificar", "buscarCep"])
        /*
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
        var c = String(cpf).replace(/[^\d]/g, '')

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

        return true
      }

      return validaCPF(cpf);
    },
    Verificar() {
      this.resultadoValidacao = this.isValidCPF(this.cpfToValidate) ? "Válido" : "Inválido";
    }*/
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
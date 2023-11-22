const mutations = {
    listar: (state, data) => {
        state.clientes = data
    },
    cadastrar: (state, cliente) => {
        //state.clientes.post(cliente)
    },
    atualizarEndereco: (state, response) => {
        console.log(response);
        state.cliente.uf = response.state
        const rua = response.street == null ? "" : response.street
        state.cliente.endereco = `${rua}, ${response.neighborhood}, ${response.city}`
    },
    remover: (state, id) => {
        /*  for (let index = 0; index < state.clientes.lenght; index++) {
              const clientes = state.clientes[index];
              if (clientes.id == id)
              state.clientes.splice(index, 1)
          } */
    },
    validarCPF: ({ state }) => {
        /* if (state.cliente.cpf) {
             const cpf = state.cliente.cpf.replace(/[^\d]+/g, '');
             if (cpf.lenght !== 14 || !state.isValidadeCPF(cpf)) {
                 state.cpfInvalido = true;
             } else {
                 state.cpfInvalido = false;
             }
         } */
    },
    isValidCPF: (cpf) => {
        /*  function validaCPF(cpf) {
              var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
              var c = string(cpf).replace(/[^\d]/g, '')
  
              if (c.length !== 14)
              return false
  
              if (/0{14}/.test(c))
              return false
  
          for (var i = 0, n = 0; i <12; n += c[i] * b[++i]);
          if (c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
          return false
  
          for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
          if (c[13] != (((n % 11) ? 0 : 11 - n)))
              return false
  
          return true
          }
  
          return validaCPF(cpf); */
    },
    Verificar: (state, cliente) => {
        // state.resultadoValidacao = state.isValidCPF(state.cpfToValidate) ? "Válido" : "Inválido";
    },
    salvarEdicao: (state, cliente) => {
        // state.clientes.put(cliente)
    }


}

export default mutations
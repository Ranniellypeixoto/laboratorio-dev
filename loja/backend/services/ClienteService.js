import db from "../config/db.js"
import { cadastrarClienteEndereco } from "./ClienteEnderecoService.js"

db.connect()

export async function cadastrarCliente(cliente) {
  const {cpf, nome, email} = cliente
  let situacao = true

  if (await findByCpf(cpf))
    return "CPF já esta cadastrado"   

  const novoCliente = new Promise((resolve, reject) => {
    const query = `INSERT INTO clientes (cpf, nome, email, situacao) VALUES (?, ?, ?, ?)`;
    db.query(query, [cpf, nome, email, situacao], function (error, resultado, fields) {
      if (error)
        reject(error);

      resolve("Cadastro realizdo com sucesso");
    });
  });

  const clienteCadastrado =  await findByCpf(cpf)
  cliente.endereco.principal = true
  cadastrarClienteEndereco(clienteCadastrado.id, cliente.endereco)  
  return novoCliente
}

export async function findByCpf(cpf) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM clientes WHERE cpf = ?';

    db.query(query, [cpf], function (error, clientes, fields) {
      if (error)
        reject(error)

      if (clientes.length > 0) {
        resolve(clientes[0]);
      } else {
        resolve(null);
      }
    });
  });
}

export async function listarClientes() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM clientes`;
    db.query(query, function (error, clientes) {
      if (error)
        reject(error);

      resolve(clientes);
    });
  });
}

export async function deletarCliente(id) {
  /**
   * TODO Correção do bug card 87 excluir os endereços 
   * relacionados a este cliente id
   */
  return new Promise((resolve, reject) => {
      const query = "DELETE FROM clientes WHERE id = ?"
      db.query(query, [id], function (error, clientes) {
          if (error)
              reject(error)

          resolve("Cliente excluído com sucesso");
      })
  })
}

export function findById(id) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM clientes WHERE id = ?';

    db.query(query, [id], function (error, clientes, fields) {
      if (error)
        reject(error)

      if (clientes.length > 0) {
        resolve(clientes[0]);
      } else {
        resolve(null);
      }
    });
  });
}

export async function exibirCliente(id) {
  return new Promise((resolve, reject) => {
      const query = "SELECT * FROM clientes WHERE id = ?"
      db.query(query, [id], function (error, clientes) {
          if (error)
              reject(error)

          if (clientes.length > 0) {
            resolve(clientes[0]);
          } else {
            resolve("Cliente não localizado");
          }
      })
  })
}

export async function editarCliente(id, cliente) {
  const {cpf, nome, email, situacao} = cliente

  const clienteCadastrado = await findById(id)
  if (!clienteCadastrado)
    return "Cliente não localizado"   

  return new Promise((resolve, reject) => {
    const query = `UPDATE clientes SET cpf = ?, nome = ?, email = ?, situacao = ? WHERE id = ?`;
    db.query(query, [cpf, nome, email, situacao, id], function (error) {
      if (error)
        reject(error);

      resolve("Edição realizda com sucesso");
    });
  });
}
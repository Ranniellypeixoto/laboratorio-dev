import express from 'express'
import AuthorizationMiddleware from '../config/AuthorizationMiddleware.js'

const router = express.Router()

import {
  cadastrarCliente,
  listarClientes,
  deletarCliente,
  exibirCliente,
  editarCliente
} from '../services/ClienteService.js'

// router.use(AuthorizationMiddleware);

router.post('/cadastrar', async function (request, responce) {
  const cliente = request.body
  const result = await cadastrarCliente(cliente)
  responce.json(result)
})

router.get('/', async function (request, responce) {
  const clientes = await listarClientes()
  responce.json(clientes)
})

router.delete('/:id', async function (request, responce) {
  const id = request.params.id
  const clientes = await deletarCliente(id)
  responce.send(clientes)
})

router.get('/:id', async function (request, responce) {
  const id = request.params.id
  const cliente = await exibirCliente(id)
  responce.send(cliente)
})

router.put('/:id', async function (request, responce) {
  const id = request.params.id
  const cliente = request.body
  const result = await editarCliente(id, cliente)
  responce.json(result)
})

export default router
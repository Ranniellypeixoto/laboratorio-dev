import {createWebHistory, createRouter} from "vue-router";
import CadastrarCliente from "./components/clientes/CadastrarCliente.vue"
import EditarCliente from "./components/clientes/EditarCliente.vue"
import ListarCliente from "./components/clientes/ListarCliente.vue"

import CadastrarFornecedor from "./components/fornecedores/CadastrarFornecedor.vue"
import EditarFornecedor from "./components/fornecedores/EditarFornecedor.vue"
import ListarFornecedor from "./components/fornecedores/ListarFornecedor.vue"

import CadastrarCategoria from "./components/categorias/CadastrarCategoria.vue"
import EditarCategoria from "./components/categorias/EditarCategoria.vue"
import ListarCategoria from "./components/categorias/ListarCategoria.vue"

import CadastrarProduto from "./components/produtos/CadastrarProduto.vue"
import ListarProduto from "./components/produtos/ListarProduto.vue"
import DeletarProduto from "./components/produtos/ListarProduto.vue"

const routes = [
    {
        path: "/clientes",
        component: ListarCliente
    },
    {
        path: "/clientes/cadastrar",
        component: CadastrarCliente
    },
    {
        path: "/clientes/:id",
        component: EditarCliente,
        props: true
    },
    {
        path: "/fornecedores",
        component: ListarFornecedor
    },    
    {
        path: "/fornecedores/cadastrar",
        component: CadastrarFornecedor
    },
    {
        path: "/fornecedores/:id",
        component: EditarFornecedor,
        props: true,
    },
    {
        path: "/categorias",
        component: ListarCategoria
    },   
    {
        path: "/categorias/cadastrar",
        component: CadastrarCategoria
    },
    {
        path: "/categorias/:id",
        component: EditarCategoria,
        props: true
    },
    {
        path: "/produtos/cadastrar",
        component: CadastrarProduto
    },
    {
        path: "/produtos",
        component: ListarProduto
    },
    {
        path: "/produto/:id",
        component: DeletarProduto
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
import repositoryServicos from "../repositories/repository.servico.js";

async function Listar() {

    const servicos = await repositoryServicos.Listar();
        // Aqui você pode aplicar validações, filtros ou formatar os dados, se necessário.
        return servicos;
}

async function  Inserir(description) {
    
    const servico = await repositoryServicos.Inserir(description);

    return servico;
}

async function Editar(id_service, description) {

    const servico = await repositoryServicos.Editar(id_service, description);

    return servico;
}

async function InserirAdmin(id_doctor, id_service, price) {
    // Você pode adicionar lógica adicional aqui, como validações mais complexas ou verificações
    // Exemplo: Validar se id_doctor e id_service existem antes de inserir
    return await repositoryServicos.InserirAdmin(id_doctor, id_service, price);
}

export default { Listar, Inserir, Editar, InserirAdmin }
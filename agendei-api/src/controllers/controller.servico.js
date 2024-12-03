import serviceServicos from "../services/service.servico.js"

async function Listar(req, res) {
    try {
        const servicos = await serviceServicos.Listar();
        res.status(200).json(servicos);
    } catch (error) {
        console.error('Erro ao listar serviços:', error);
        res.status(500).json({ error: 'Erro ao listar serviços.' });
    }
}

async function Inserir(req, res) {
    try {
        const { description } = req.body;

        // Verifica se 'description' foi informado
        if (!description || description.trim() === "") {
            return res.status(400).json({
                error: "O campo 'Descrição' é obrigatório.",
            });
        }

        // Insere o serviço no banco de dados
        const servico = await serviceServicos.Inserir(description);

        // Retorna o serviço criado
        res.status(201).json(servico);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Erro ao salvar o serviço. Tente novamente mais tarde.",
        });
    }
}

async function Editar(req, res) {

    const id_service = req.params.id_service;
    const { description } = req.body;

    const servico = await serviceServicos.Editar(id_service, description);

    res.status(201).json(servico);
}

async function InserirAdmin(req, res) {
    try {
        const { id_doctor, id_service, price } = req.body;

        // Validação básica dos campos
        if (!id_doctor || !id_service || price == null || isNaN(price)) {
            return res.status(400).json({
                error: "Campos obrigatórios: id_doctor, id_service e price devem ser informados.",
            });
        }

        // Chama o service para inserir o registro
        const result = await serviceServicos.InserirAdmin(id_doctor, id_service, price);

        // Responde com sucesso
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Erro ao inserir o serviço do médico. Tente novamente mais tarde.",
        });
    }
}


export default { Listar, Inserir, Editar, InserirAdmin }
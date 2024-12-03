import serviceDoctor from "../services/service.doctor.js"

async function Listar (req, res) {

    const name = req.query.name;

    const doctors = await serviceDoctor.Listar(name);

    res.status(200).json(doctors);
}

async function ListarId (req, res) {

    const id_doctor = req.params.id_doctor;

    const doctor = await serviceDoctor.ListarId(id_doctor);

    res.status(200).json(doctor);
}

async function Inserir (req, res) {

    /*
    UMA FORMA DE FAZER A ESTRUTURAÇÃO
    const name = req.body.name;
    const specialty = req.body.specialty;
    const icon = req.body.icon;
    */

    //Outra forma mais simplificada de fazer o mesmo processo
    const { name, specialty, icon} = req.body;

    const doctor = await serviceDoctor.Inserir(name, specialty, icon);

    res.status(201).json(doctor);
}

async function Editar(req, res) {

    const id_doctor = req.params.id_doctor;
    const { name, specialty, icon} = req.body;

    const doctor = await serviceDoctor.Editar(id_doctor, name, specialty, icon);

    res.status(201).json(doctor);
}

async function Excluir(req, res) {

    const id_doctor = req.params.id_doctor;

    const doctor = await serviceDoctor.Excluir(id_doctor);

    res.status(201).json(doctor);
}

async function ListarServicos (req, res) {

    const id_doctor = req.params.id_doctor;

    const service = await serviceDoctor.ListarServicos(id_doctor);

    res.status(200).json(service);
}

export default { Listar, Inserir, Editar, Excluir, ListarServicos, ListarId };
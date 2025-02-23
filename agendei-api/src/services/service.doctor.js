import repositoryDoctor from "../repositories/repository.doctor.js";

async function Listar (name) {
    
    const doctors = await repositoryDoctor.Listar(name);

    return doctors;
}

async function ListarId (id_doctor) {

    const doctor = await repositoryDoctor.ListarId(id_doctor);

    return doctor;
}

async function  Inserir(name, specialty, icon) {
    
    const doctor = await repositoryDoctor.Inserir(name, specialty, icon);

    return doctor;
}

async function  Editar(id_doctor, name, specialty, icon) {
    
    const doctor = await repositoryDoctor.Editar(id_doctor, name, specialty, icon);

    return doctor;
}

async function  Excluir(id_doctor) {
    
    const doctor = await repositoryDoctor.Excluir(id_doctor);

    return doctor;
}

async function ListarServicos (id_doctor) {
    
    const service = await repositoryDoctor.ListarServicos(id_doctor);

    return service;
}

export default {Listar, Inserir, Editar, Excluir, ListarServicos, ListarId}
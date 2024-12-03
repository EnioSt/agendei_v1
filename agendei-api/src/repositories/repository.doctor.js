import { query } from "../database/sqlite.js";

async function Listar (name) {

    let filtro = [];

    let sql = "SELECT * FROM doctors "

    if(name){
        sql = sql + "where name like ? "
        filtro.push('%'+name+'%')
    }

    sql = sql + "order by name"

    const doctors = await query(sql, filtro);

    return doctors;
} 

async function ListarId (id_doctor) {

    let sql = `select * from doctors
                where id_doctor = ?`

    const doctor = await query(sql, [id_doctor])

    return doctor[0];
}

async function Inserir (name, specialty, icon) {

    let sql = `insert into doctors (name, specialty, icon) values(?,?,?)
    returning id_doctor`;

    const doctor = await query(sql, [name, specialty, icon]);

    return doctor[0];
}

async function Editar (id_doctor, name, specialty, icon) {

    let sql = `update doctors set name=?,
                                specialty=?,
                                icon=?
                where id_doctor = ?`;

    await query(sql, [name, specialty, icon, id_doctor]);

    return {id_doctor};
}

async function Excluir (id_doctor) {

    let sql = `delete from doctors where id_doctor = ?`;

    await query(sql, [id_doctor]);

    return {id_doctor};
}

async function ListarServicos (id_doctor) {

    let sql = `select d.id_service, s.description, d.price
                from doctors_services d
                join services s on (s.id_service = d.id_service)
                where id_doctor = ?
                order by s.description`

    const service = await query(sql, [id_doctor]);

    return service;
}

export default {Listar, Inserir, Editar, Excluir, ListarServicos, ListarId}
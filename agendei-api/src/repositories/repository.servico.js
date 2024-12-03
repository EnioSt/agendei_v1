import { query } from "../database/sqlite.js";

async function Listar() {

    let sql = 'SELECT id_service, description FROM services';

        const servicos = await query(sql); // Método depende da lib (e.g., Sequelize, Knex ou mysql2).
        return servicos;
}

async function Inserir (description) {

    let sql = `insert into services (description) values(?)
    returning id_service`;

    const servico = await query(sql, [description]);

    return servico[0];
}

async function Editar(id_service, description) {
    let sql = `UPDATE services
                SET description = ?
                WHERE id_service = ?;`;

    await query(sql, [description, id_service]);

    return {id_service};
}

async function InserirAdmin(id_doctor, id_service, price) {
    let sql = `
        INSERT INTO doctors_services (id_doctor, id_service, price)
        VALUES (?, ?, ?)
        returning id_doctor_service
    `;
    const result = await query(sql, [id_doctor, id_service, price]);

    return result[0];
}

export default { Listar, Inserir, Editar, InserirAdmin }
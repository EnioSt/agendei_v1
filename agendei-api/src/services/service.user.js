import repositoryUser from "../repositories/repository.user.js";
import bcrypt from "bcrypt";
import jwt from "../token.js"
import { query } from "../database/sqlite.js";

async function findByEmail(email) {
    // Substitua pela consulta apropriada para o seu banco de dados
    let sql = `SELECT * FROM users WHERE email = ?`

    const user = await query(sql, [email]);
    
    return user; // Retorna o usuário encontrado ou undefined se não existir
}

async function  Inserir(name, email, password) {

    const hashPassword = await bcrypt.hash(password, 10)
    //const repositoriUser = await repositoryUser.Validar(email)
    const user = await repositoryUser.Inserir(name, email, hashPassword);

    user.token = jwt.CreateToken(user.id_user);

    return user;

}

async function Login(email, password) {
    
    const user = await repositoryUser.ListarByEmail(email);

    if(user.length == 0)
        return [];
    else {
        if(await bcrypt.compare(password, user.password)) {
            delete user.password;
            user.token = jwt.CreateToken(user.id_user);
            return user;
        } else 
            return[];
    }
}

async function Profile(id_user) {
    
    const user = await repositoryUser.Profile(id_user);
    
    return user;
}

async function  InserirAdmin(name, email, password) {

    const hashPassword = await bcrypt.hash(password, 10)
    
    const user = await repositoryUser.InserirAdmin(name, email, hashPassword);

    user.token = jwt.CreateToken(user.id_user);

    return user;

}

async function LoginAdmin(email, password) {
    
    const user = await repositoryUser.ListarByEmailAdmin(email);

    if(user.length == 0)
        return [];
    else {
        if(await bcrypt.compare(password, user.password)) {
            delete user.password;
            user.token = jwt.CreateToken(user.id_user);
            return user;
        } else 
            return[];
    }
}

/*async function Validar(email) {
    
    const user = await repositoryUser.Validar(email);
    
    return user;
}*/

async function Listar() {
    
    const users = await repositoryUser.Listar();
    
    return users;
}

export default {Inserir, Login, Profile, InserirAdmin, LoginAdmin, Listar, findByEmail}
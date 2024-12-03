import { Link, useNavigate, useParams } from "react-router-dom";
import "./register.css"
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png"
import { useState } from "react";
import api from "../../constants/api.js"

const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [msg, setMsg] = useState("");

    async function ExecuteAccount() {

        setMsg("");


        if (password != password2)
            return setMsg("As senhas são diferentes")

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return setMsg("E-mail inválido!");
        }



        try {
            const response = await api.post("/admin/register", {
                name,
                email,
                password
            })

            if (response.data) {
                localStorage.setItem("sessionToken", response.data.token);
                localStorage.setItem("sessionID", response.data.id_admin);
                localStorage.setItem("sessionEmail", email);
                localStorage.setItem("sessionName", name);
                api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
                navigate("/appointments")
            } else {
                setMsg("Erro ao efetuar login. Tente novamente mais tarde.")
            }
        } catch (error) {
            if (error.response?.data.error)
                setMsg(error.response?.data.error)
            else
                setMsg("Erro ao efetuar login. Tente novamente mais tarde.")
        }
    }

    return (
        <div className="row">
            <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
                <form action="" className="form-signin">
                    <img src={logo} alt="logo da empresa" className="logo mb-4" />
                    <h5 className="mb-5">Crie sua conta agora mesmo.</h5>
                    <h5 className="mb-4 text-secondary">Preencha sua conta abaixo</h5>
                    <div className="mt-4">
                        <input onChange={(name) => setName(name.target.value)} className="form-control" type="text" placeholder="Nome" />
                    </div>
                    <div className="mt-2">
                        <input onChange={(email) => setEmail(email.target.value)} className="form-control" type="email" placeholder="E-mail" />
                    </div>
                    <div className="mt-2">
                        <input onChange={(password) => setPassword(password.target.value)} className="form-control" type="password" placeholder="senha" />
                    </div>
                    <div className="mt-2">
                        <input onChange={(password) => setPassword2(password.target.value)} className="form-control" type="password" placeholder="Confirme a senha" />
                    </div>
                    <div className="mt-3 mb-5">
                        <button onClick={ExecuteAccount} type="button" className="btn btn-primary w-100" typeof="button">Criar minha conta</button>
                    </div>
                    {
                        msg.length > 0 ?
                            <div className="alert alert-danger" role="alert">
                                {msg}
                            </div> : null
                    }
                    <div>
                        <span className="me-1">Já tenho uma conta.</span>
                        <Link to="/">Acessar agora!</Link>
                    </div>
                </form>
            </div>

            <div className="col-sm-7">
                <img src={fundo} alt="imagem de fundo" className="background-login" />
            </div>
        </div>
    )
}

export default Register;
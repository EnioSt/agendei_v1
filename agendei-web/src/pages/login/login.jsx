import "./login.css"
import logo from "../../assets/logo.png"
import logoWhite from "../../assets/logo-white.png";
import fundo from "../../assets/fundo.png"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../constants/api.js"

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [darkMode, setDarkMode] = useState(false); // Estado para o modo escuro

    // Função para alternar o tema
    const toggleTheme = () => {
        setDarkMode(!darkMode); // Alterna o estado do modo escuro
    };

    async function ExecuteLogin() {

        setMsg("")

        try {
            const response = await api.post("/admin/login", {
                email,
                password
            })

            if (response.data) {
                localStorage.setItem("sessionToken", response.data.token);
                localStorage.setItem("sessionID", response.data.id_admin);
                localStorage.setItem("sessionEmail", response.data.email);
                localStorage.setItem("sessionName", response.data.name);
                api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
                navigate("/appointments");
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
        <>
            <div className={`row vh-100 ${darkMode ? 'dark' : ''}`}>
                <div className="col-md-5 d-flex justify-content-center align-items-center text-center">
                    <form action="" className="form-signin">
                        <div className={`trilho ${darkMode ? 'dark' : ''}`} id="trilho" onClick={toggleTheme}>
                            <div className="interruptor" id="interruptor">
                            </div>
                        </div>
                        <img 
                            alt="logo da empresa" 
                            id="logo" 
                            className="logo mb-4" 
                            src={darkMode ? logoWhite : logo} 
                        />
                        <h5 className="mb-5">Gerencie seus agendamentos de forma descomplicada.</h5>
                        <h5 className="mb-4 text-secondary">Acesse sua conta</h5>
                        <div className="mt-4">
                            <input className="form-control" type="email" placeholder="E-mail" onChange={(email) => setEmail(email.target.value)} />
                        </div>
                        <div className="mt-2">
                            <input onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    ExecuteLogin();
                                }
                            }} className="form-control" type="password" placeholder="Senha" onChange={(senha) => setPassword(senha.target.value)} />
                        </div>
                        <div className="mt-3 mb-5">
                            <button onClick={ExecuteLogin} type="button" className="btn btn-primary w-100">Acessar</button>
                        </div>
                        {
                            msg.length > 0 ?
                                <div className="alert alert-danger" role="alert">
                                    {msg}
                                </div> : null
                        }
                        <div>
                            <span className={`me-1  ${darkMode ? 'dark' : ''}`}>Não tenho uma conta.</span>
                            <Link to="/register">Criar agora!</Link>
                        </div>
                    </form>
                </div>

                <div className="col-md-7 d-none d-md-block">
                    <img src={fundo} alt="imagem de fundo" className="background-login" />
                </div>
            </div>
        </>
    )

}

export default Login;
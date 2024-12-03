import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/navbar";
import "./profile.css"

const Profile = () => {

    const navigate = useNavigate()

    function Logout() {
        localStorage.removeItem("sessionToken");
                localStorage.removeItem("sessionID");
                localStorage.removeItem("sessionEmail");
                localStorage.removeItem("sessionName");
                navigate("/")
                api.defaults.headers.common['Authorization'] = "";
    }
    
    return (
        <>
            <NavBar />

            <div className="container-profile">
                <div className="form">
                    <div className="item">
                        <h3 className="item-titulo">E-mail</h3>
                        <p className="item-texto">{localStorage.getItem("sessionEmail")}</p>
                    </div>

                    <div>
                        <h3 className="item-titulo">Nome</h3>
                        <p className="item-texto">{localStorage.getItem("sessionName")}</p>
                    </div>

                    <div className="item">
                        <button className="botao" onClick={Logout}>Sair</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
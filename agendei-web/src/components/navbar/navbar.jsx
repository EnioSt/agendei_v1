import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"
import Logo from "../../assets/logo-white.png"

const NavBar = () => {

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
        <nav className="navbar fixed-top navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/appointments">
                    <img className="navbar-logo" src={Logo} alt="" />
                </Link>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link active" to="/appointments">Agendamentos</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/doctors">Médicos</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <div class="btn-group">
                                <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {localStorage.getItem("sessionName")}
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><Link to="/profile" class="dropdown-item" href="#">Meu perfil</Link></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><button class="dropdown-item" onClick={Logout}>Desconectar</button></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
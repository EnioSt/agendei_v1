import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/navbar/navbar.jsx";
import api from "../../constants/api.js";
import { useEffect, useState } from "react";

const DoctorsAdd = () => {
    const navigate = useNavigate();
    const { id_doctor } = useParams(); // ID do médico para edição
    const [name, setName] = useState(""); // Nome do médico
    const [specialty, setSpecialty] = useState(""); // Especialidade
    const [icon, setIcon] = useState(""); // Ícone ou sexo
    const [msg, setMsg] = useState(""); // Mensagem de erro ou status

    async function SaveDoctor() {
        const json = {
            id_doctor,
            name,
            specialty,
            icon,
        };

        try {
            const response = id_doctor
                ? await api.put("/doctors/" + id_doctor, json)
                : await api.post("/doctors", json);

            if (response.data) {
                navigate("/doctors");
            }
        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status === 401) navigate("/");
                setMsg(error.response?.data.error);
            } else {
                setMsg("Erro ao salvar dados");
            }
        }
    }

    async function LoadDoctor(id) {
        if (!id) return;

        try {
            const response = await api.get("/admin/doctors/" + id);
            if (response.data) {
                setName(response.data.name);
                setSpecialty(response.data.specialty);
                setIcon(response.data.icon);
            }
        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status === 401) navigate("/");
                setMsg(error.response?.data.error);
            } else {
                setMsg("Erro ao carregar dados");
            }
        }
    }

    useEffect(() => {
        if (id_doctor) {
            LoadDoctor(id_doctor); // Carrega os dados se for edição
        }
    }, [id_doctor]); // Dependência no ID do médico

    return (
        <>
            <NavBar />

            <div className="container-fluid mt-page">
                <div className="row col-lg-4 offset-lg-4">
                    <div className="col-12 mt-2">
                        <h2>{id_doctor ? "Editar Médico" : "Novo Médico"}</h2>
                    </div>

                    <div className="col-12 mt-4">
                        <label htmlFor="doctor" className="form-label">Médico</label>
                        <div className="form-control mb-2">
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nome do Médico"
                            />
                        </div>
                    </div>

                    <div className="col-12 mt-4">
                        <label htmlFor="user" className="form-label">Especialidade</label>
                        <div className="form-control mb-2">
                            <input
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                placeholder="Informe a Especialidade"
                            />
                        </div>
                    </div>

                    <div className="col-12 mt-3">
                        <label htmlFor="service" className="form-label">Sexo</label>
                        <div className="form-control mb-2">
                            <select
                                name="service"
                                id="service"
                                required
                                value={icon}
                                onChange={(e) => setIcon(e.target.value)}
                            >
                                <option value="">Selecione o Sexo</option>
                                <option value="F">F</option>
                                <option value="M">M</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 mt-4">
                        <div className="d-flex justify-content-end">
                            <Link to="/doctors" className="btn btn-outline-primary me-3">
                                Cancelar
                            </Link>
                            <button onClick={SaveDoctor} className="btn btn-primary" type="button">
                                Salvar Dados
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorsAdd;

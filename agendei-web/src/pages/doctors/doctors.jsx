import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/navbar"
import { useEffect, useState } from "react";
import Doctor from "../../components/doctor/Doctor";
import api from "../../constants/api.js";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Doctors = () => {

    const navigate = useNavigate();
    const [doctor, setDoctor] = useState([]);

    function ClickEdit(id_doctor) {
        console.log(id_doctor)
        navigate("/doctors/edit/" + id_doctor); 
    }

    async function LoadoadDoctors() {
        try {
            const response = await api.get("/doctors");

            if(response.data){
                setDoctor(response.data);
            }

        } catch (error) {
            if(error.response?.data.error){

                if(error.response.status == 401)
                    navigate("/");

                setMsg(error.response?.data.error)
            } else
                setMsg("Erro ao Listar Médicos")
        }
    }

    function ClickDelete(id_doctor) {
        confirmAlert({
            title: "Exclusão",
            message: "Confirma exclusão desse Médico?",
            buttons: [
                {
                    label: "Sim",
                    onClick: () => DeleteDoctor(id_doctor)
                },
                {
                    label: "Não",
                    onClick: () => {  }
                }
            ]
        });
    }

    async function DeleteDoctor(id) {
        try {
            const response = await api.delete("/doctors/" + id);

            if(response.data){
                console.log(response)
                LoadoadDoctors();
            }

        } catch (error) {
            if(error.response?.data.error){

                if(error.response.status == 401)
                    navigate("/");

                setMsg(error.response?.data.error)
            } else
                setMsg("Erro ao Excluir Reserva")
        }
    }

    useEffect(() => {
        LoadoadDoctors();
    }, [])

    return (
        <div className="container-fluid mt-page">
            <NavBar />

            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="d-inline">Médicos</h2>
                    <Link to="/doctors/add" className="btn btn-outline-primary ms-5 mb-2">
                        Novo Médico
                    </Link>
                </div>
            </div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Especialidade</th>
                            <th scope="col">Icone</th>
                            <th scope="col" className="col-buttons"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctor.map((dc) => {
                                return <Doctor
                                    key={dc.id_doctor}
                                    name={dc.name}
                                    specialty={dc.specialty}
                                    icon={dc.icon}
                                    clickEdit={() => ClickEdit(dc.id_doctor)}
                                    clickDelete={() => ClickDelete(dc.id_doctor)}
                                />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Doctors; 
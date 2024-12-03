import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useEffect, useState } from "react";
import api from "../../constants/api.js";
import "./appointments-add.css"
import Modal from "../../components/modal/modal.jsx";
import Dropdown from "../../components/dropdown/dropdown.jsx";
import Input from "../../components/input/input.jsx";

// o offset significa que o "form" ficara no meio, pois o display grid divide a tela em 12 e o nosso "form" utiliza 4, então com o offset ficara 4 de cada lado 
function AppointmentAdd() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setSelectedService(null); // Limpa o estado ao fechar o modal
    };

    // Lógica para alternar o conteúdo do modal
    const [modalContent, setModalContent] = useState("associar"); // associar, adicionar, editar
    const titleLinks = [
        { label: "Associar Serviço ao médico", onClick: () => setModalContent("associar") },
        { label: "Adicionar Serviço", onClick: () => setModalContent("adicionar") },
        { label: "Editar Serviço", onClick: () => setModalContent("editar") },
    ];

    const navigate = useNavigate();
    const { id_appointment } = useParams();
    const { id_service } = useParams();
    const [users, setUsers] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [services, setServices] = useState([]);
    const [idUser, setIdUser] = useState("");
    const [idDoctor, setIdDoctor] = useState("");
    const [idServico, setIdServico] = useState("");
    const [description, setDescription] = useState("")
    const [selectedService, setSelectedService] = useState(null);
    const [price, setPrice] = useState(""); // Preço
    const [idService, setIdService] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [bookingHour, setBookingHour] = useState("");


    async function SaveDoctorService() {
        const json = {
            id_doctor: idDoctor,
            id_service: idServico,
            price: price
        };

        try {
            const response = await api.post("/admin/servicos/doctor", json);

            if (response.data) {
                setIsModalOpen(false); // Fecha o modal
                //navigate("/appointments/add"); // Redireciona após fechar o modal
                setIdDoctor(""); // Limpa o campo Médico
                setIdServico(""); // Limpa o campo Serviço
                setPrice(""); // Limpa o campo Preço
                await LoadServices(idDoctor); // Atualiza os serviços vinculados ao médico
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

    async function SaveAddService() {
        const json = {
            id_service,
            description
        }

        try {
            const response = await api.post("/admin/servicos", json)

            if(response.data){
                setIsModalOpen(false); // Fecha o modal
                setDescription("");
                await LoadServicos();
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

    async function SaveEditService() {
        const json = {
            id_service: selectedService?.id_service,
            description: selectedService?.description,
        };
    
        try {
            const response = await api.put(`/admin/servicos/${json.id_service}`, json);
    
            if (response.data) {
                setIsModalOpen(false); // Fecha o modal
                setSelectedService(null); // Limpa o estado
                await LoadServicos(); // Atualiza a lista de serviços
            }
        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status === 401) navigate("/");
                setMsg(error.response?.data.error);
            } else {
                setMsg("Erro ao editar o serviço");
            }
        }
    }

    async function SaveAppointment() {

        const json = {
            id_user: idUser,
            id_doctor: idDoctor,
            id_service: idService,
            booking_date: bookingDate,
            booking_hour: bookingHour
        };

        try {
            const respose = id_appointment > 0 ?
                await api.put("/admin/appointments/" + id_appointment, json)
                :
                await api.post("/admin/appointments", json);

            if (respose.data) {
                navigate("/appointments")
            }
        } catch (error) {
            if (error.response?.data.error) {

                if (error.response.status == 401)
                    navigate("/");

                setMsg(error.response?.data.error)
            } else
                setMsg("Erro ao salvar dados")
        }
    }

    async function LoadUsers() {
        try {
            const response = await api.get("/admin/users");

            if (response.data) {
                setUsers(response.data);
            }

        } catch (error) {
            if (error.response?.data.error) {

                if (error.response.status == 401)
                    navigate("/");

                setMsg(error.response?.data.error)
            } else
                setMsg("Erro ao Listar Médicos")
        }
    }

    async function LoadDoctors() {
        try {
            const response = await api.get("/doctors");

            if (response.data) {
                setDoctors(response.data);

                //Se for modo alteração de apontamentos
                if (id_appointment > 0)
                    LoadAppointments(id_appointment)
            }

        } catch (error) {
            if (error.response?.data.error) {

                if (error.response.status == 401)
                    return navigate("/");

                setMsg(error.response?.data.error)
            } else
                setMsg("Erro ao Listar Médicos")
        }
    }

    async function LoadAppointments(id) {

        if (!id)
            return;

        try {
            const response = await api.get("/admin/appointments/" + id);

            if (response.data) {
                setIdUser(response.data.id_user)
                setIdDoctor(response.data.id_doctor)
                setIdService(response.data.id_service)
                setBookingDate(response.data.booking_date)
                setBookingHour(response.data.booking_hour)
            }

        } catch (error) {
            if (error.response?.data.error) {

                if (error.response.status == 401)
                    return navigate("/");

                setMsg(error.response?.data.error)
            } else
                setMsg("Erro ao Listar Serviços")
        }
    }

    async function LoadServicos() {
        try {
            const response = await api.get("/admin/servicos");

            if (response.data) {
                setServicos(response.data);
            }
        } catch (error) {
            if (error.response?.data.error) {

                if (error.response.status == 401)
                    return navigate("/");

                setMsg(error.response?.data.error)
            } else
                setMsg("Erro ao Listar Médicos")
        }
    }

    async function LoadServices(id) {

        if (!id)
            return;

        try {
            const response = await api.get("/doctors/" + id + "/services");

            if (response.data) {
                setServices(response.data)
            }

        } catch (error) {
            if (error.response?.data.error) {

                if (error.response.status == 401)
                    return navigate("/");

                setMsg(error.response?.data.error)
            } else
                setMsg("Erro ao Listar Serviços")
        }
    }

    useEffect(() => {
        LoadUsers();
        LoadDoctors();
        LoadServicos();
    }, [])

    useEffect(() => {
        LoadServices(idDoctor);
    }, [idDoctor])

    return <>
        <Navbar />

        <div className="container-fluid mt-page">
            <div className="row col-lg-4 offset-lg-4">
                <div className="col-12 mt-2">
                    <h2>
                        {
                            id_appointment > 0 ? "Editar Agendamento" : "Novo Agendamento"
                        }
                    </h2>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Paciente</label>
                    <div className="form-control mb-2">
                        <select name="user" id="user"
                            value={idUser} onChange={(e) => setIdUser(e.target.value)}>
                            <option value="0">Selecione o paciente</option>

                            {users.map(u => {
                                return <option key={u.id_user} value={u.id_user}>{u.name}</option>
                            })}

                        </select>
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="doctor" className="form-label">Médico</label>
                    <div className="form-control mb-2">
                        <select name="doctor" id="doctor"
                            value={idDoctor} onChange={(e) => setIdDoctor(e.target.value)}>
                            <option value="0">Selecione o médico</option>

                            {doctors.map(d => {
                                return <option key={d.id_doctor} value={d.id_doctor}>{d.name}</option>
                            })}

                        </select>
                    </div>
                </div>

                <div className="col-12 mt-3">
                    <label htmlFor="service" className="form-label">Serviço</label>
                    <div className="servico">
                        <div className="form-control mb-2">
                            <select name="service" id="service"
                                value={idService} onChange={(e) => setIdService(e.target.value)} >
                                <option value="0">Selecione o serviço</option>

                                {services.map(s => {
                                    return <option key={s.id_service}
                                        value={s.id_service}>{s.description}</option>
                                })}

                            </select>
                        </div>
                        <div className="add-servico">
                            <i
                                className="bi bi-plus-circle"
                                onClick={toggleModal} // Controla o modal
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>
                    </div>
                </div>

                <div className="col-6 mt-3">
                    <label htmlFor="bookingDate" className="form-label">Data</label>
                    <input type="date" className="form-control" name="bookingDate" id="bookingDate"
                        value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
                </div>

                <div className="col-6 mt-3">
                    <label htmlFor="bookingDate" className="form-label">Horário</label>
                    <div className="form-control mb-2">
                        <select name="bookingHour" id="bookingHour"
                            value={bookingHour} onChange={(e) => setBookingHour(e.target.value)} >
                            <option value="0">Horário</option>
                            <option value="09:00">09:00</option>
                            <option value="09:30">09:30</option>
                            <option value="10:00">10:00</option>
                            <option value="09:30">10:30</option>
                            <option value="11:00">11:00</option>
                        </select>
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end">
                        <Link to="/appointments"
                            className="btn btn-outline-primary me-3">
                            Cancelar
                        </Link>
                        <button onClick={SaveAppointment} className="btn btn-primary" type="button">Salvar Dados</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Modal */}
        <Modal
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            titleLinks={titleLinks}
            onSave={() => {
                if (modalContent === "associar") SaveDoctorService();
                if (modalContent === "adicionar") SaveAddService();
                if (modalContent === "editar") SaveEditService();
            }} // Exemplo: ajuste conforme a lógica
        >
            {modalContent === "associar" && (
                <>
                    <Dropdown
                        label="Médico"
                        options={doctors}
                        value={idDoctor}
                        onChange={(e) => setIdDoctor(e.target.value)}
                        id="doctor"
                    />
                    
                    <Dropdown 
                        label="Serviço"
                        options={servicos}
                        value={idServico}
                        onChange={(e) => setIdServico(e.target.value)}
                        id="servico"
                    />

                    <Input 
                        label="Preço"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Informe o Preço do serviço"
                        className="form-control"
                    />

                    {/*<div className="col-12 mt-4">
                        <label htmlFor="price" className="form-label">Preço</label>
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Informe o Preço do serviço"
                            className="form-control"
                        />
                    </div>*/}
                </>
            )}
            {modalContent === "adicionar" && 
                <Input 
                    label="Novo Serviço"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Informe a descrição do novo serviço"
                    className="form-control"
                />
            }
            {modalContent === "editar" &&
            <>
                <Dropdown 
                    label="Serviço"
                    options={servicos}
                    value={idServico}
                    onChange={(e) => {
                        const serviceId = e.target.value;
                        setIdServico(serviceId);
                    
                        // Encontra o serviço selecionado pelo ID e atualiza o estado
                        const service = servicos.find((s) => s.id_service === parseInt(serviceId));
                        setSelectedService(service || { description: "" });
                        }}
                    id="servico"
            />

                <Input 
                    label="Edite o Serviço selecionado"
                    value={selectedService?.description || ""}
                    onChange={(e) => {
                        setSelectedService((prev) => ({ ...prev, description: e.target.value }));
                        }}
                    placeholder="Informe a nova descrição do serviço"
                    className="form-control"
                />
            </>    
            }
        </Modal>
    </>
}
export default AppointmentAdd;
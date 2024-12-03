import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Appointments from "./pages/appointments/appointments.jsx";
import AppointmentsAdd from "./pages/appointments-add/appointments-add.jsx";
import Doctors from "./pages/doctors/doctors.jsx";
import DoctorsAdd from "./pages/doctors-add/doctors-add.jsx";
import Profile from "./pages/profile/profile.jsx";


const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/appointments/add" element={<AppointmentsAdd />} />
                <Route path="/appointments/edit/:id_appointment" element={<AppointmentsAdd />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/add" element={<DoctorsAdd />} />
                <Route path="/doctors/edit/:id_doctor" element={<DoctorsAdd />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;
const Dropdown = ({ label, options, value, onChange, id }) => {
    return (
      <div className="col-12 mt-4">
        <label htmlFor={id} className="form-label">{label}</label>
        <div className="form-control mb-2">
          <select name={id} id={id} value={value} onChange={onChange}>
            <option value="0">Selecione</option>
            {options.map((option) => (
              <option key={option.id_doctor || option.id_service} value={option.id_doctor || option.id_service}>{option.name || option.description}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  
  export default Dropdown;
  
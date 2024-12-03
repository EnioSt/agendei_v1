const Input = ({ label, value, onChange, placeholder, className, id }) => {
    return (
        <>
            <div className="col-12 mt-4">
                <label htmlFor={id} className="form-label">{label}</label>
                <input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={className}
                />
            </div>
        </>
    )
}

export default Input;
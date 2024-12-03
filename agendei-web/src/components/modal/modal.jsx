import React from "react";

const Modal = ({
  isOpen,
  toggleModal,
  titleLinks,
  children,
  onSave,
}) => {
  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <nav className="nav">
              {titleLinks.map((link, index) => (
                <span
                  key={index}
                  onClick={link.onClick}
                  className="modal-title nav-link"
                  style={{ cursor: "pointer" }}
                >
                  {link.label}
                </span>
              ))}
            </nav>
            <button
              type="button"
              className="btn-close"
              onClick={toggleModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={toggleModal}
            >
              Fechar
            </button>
            <button onClick={onSave} type="button" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

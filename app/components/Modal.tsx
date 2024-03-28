import React from "react";

interface ModalProps {
  modalOpen: boolean;
  setModalOpenpass: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpenpass,
  children,
}) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={() => setModalOpenpass(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {children}
      </div>
    </div>
  );
};

export default Modal;

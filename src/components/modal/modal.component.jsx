import { Modal } from "react-bootstrap"

const DashModal = ({ children, title, subtitle, onHide, show }) => {
    return (<Modal
        show={show} onHide={onHide}>
        <div className="modal-content">
            <Modal.Header closeButton>
                <div className="nk-modal">
                    <h4 className="nk-modal-title">{title}</h4>
                </div>

            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </div>
    </Modal>)
}

export default DashModal
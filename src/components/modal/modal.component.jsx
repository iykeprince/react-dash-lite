import { Modal } from "react-bootstrap"

const DashModal = ({ children, title, subtitle, onHide, show }) => {
    return (<Modal
        show={show} onHide={onHide}>
        <Modal.Header closeButton>
          
        <h4 className="title">{title}</h4>
           
           <p>{subtitle}</p>
                
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
    </Modal>)
}

export default DashModal
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataSuccess } from "../HomeSlice";
import cross from '../images/cross.png';

type ModalProps = {
    showModal: boolean;
    handleCloseModal: () => void;
};

const Delete = ({ showModal, handleCloseModal }: ModalProps) => {
    const UsersData = useSelector((state: any) => state?.homeslice?.data);
    const SelectedUser = useSelector((state:any) => state.homeslice.selectedUser);

    const dispatch = useDispatch();
    const modalStyle = {
        display: showModal ? 'block' : 'none',
    };
    const handleDelete = () => {
        const updatedUsers = UsersData.filter((user: any) => user.id !== SelectedUser);
        dispatch(fetchDataSuccess(updatedUsers));
        handleCloseModal();
    };
    
    return (
        <>
            <Modal
                show={showModal}
                centered
                style={modalStyle}>
                <Modal.Body style={{width:'1000px',height:'130px'}}>
                    <span><b>Are you sure you want to delete?</b></span>
                    <img src={cross} className="crossbtn" onClick={handleCloseModal}/>
                    <br></br><br></br>
                    <button className="cancelbtn" onClick={handleCloseModal}>Cancel</button>&nbsp;&nbsp;
                    <button className="deletebtn" onClick={handleDelete}>Delete</button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Delete;

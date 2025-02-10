//import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";

import { deleteUser } from '../../../services/apiServices';
const ModalDeleteUser=(props)=> {
    const { show, setShow , dataDelete} = props;

  const handleClose = () => setShow(false);
   
    //ham gui du lieu len server sau khi xoa 
    const handleSubmitDeleteUser = async() => {
         try {
            let data = await deleteUser(dataDelete.id);
            console.log("Check res:", data);

            if (data && data.EC===0) {
                toast.success("Deletesuccess");
              handleClose();
              await props.fetchListUsers();
            } else {
                toast.error("Unexpected API response");
            }
        } catch (error) {
            console.error("Error when submitting form:", error);
            toast.error("Something went wrong, please try again!");
        }
    };
        
 
    
      
  return (
    <>
    
          <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
          >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the User?</Modal.Title>
        </Modal.Header>
              <Modal.Body>Are you sure to delete this user :email =
                  <b>{dataDelete && dataDelete.email ? dataDelete.email : ""} </b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           Cancel
          </Button>
          <Button variant="primary" onClick={()=>handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;
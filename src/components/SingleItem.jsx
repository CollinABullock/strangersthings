import { useParams, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Message from "./Messages";
import Modal from 'react-modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const customModalStyles = {
  overlay: {
    backgroundColor: "black",
    padding: "20px",
    width: "80%",
    margin: "0"
  },
  content: {
    width: '80%', 
    margin: '0 auto', // Center the modal horizontally
    padding: '20px', 
    display: 'flex',
    backgroundColor: "black",
    color: "red",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },
};


const COHORT_NAME = "2306-FTB-ET-WEB-AM";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}/posts`;

const SingleItem = (props) => {
  const [filteredItem, setFilteredItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log(props.items);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const foundItem = props.items.find((e) => {
      if (e._id === id) {
        return true;
      } else {
        return false;
      }
    });
    console.log(foundItem);
    if (foundItem) {
      setFilteredItem(foundItem);
    } else {
      setFilteredItem(null);
    }
  }, [props.items]);

    // Function to open the modal
    const openModal = () => {
      setModalIsOpen(true);
    };
  
    // Function to close the modal
    const closeModal = () => {
      setModalIsOpen(false);
    };

  return (
    <div className="single-item-container">
      {filteredItem && filteredItem.title ? (

        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {filteredItem.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {filteredItem.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{filteredItem.price}</Button>
        <Button size="small" onClick={openModal}>Message Seller</Button>
<div>
            <button onClick={openModal} style={{padding: "5px", height: "auto", marginBottom: "20px"}}>Message Seller</button>
          </div>
<Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Message Modal"
            style={customModalStyles}
          >
            {/* Render the Message component inside the modal */}
            <Message isLoggedIn={props.isLoggedIn} id={filteredItem._id} />
            <button onClick={closeModal} style={{padding: "5px", height: "auto", marginBottom: "20px"}}>Close</button>
          </Modal>

        </div>
      ) : null}
    </div>
  );
};

export default SingleItem;
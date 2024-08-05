"use client";
import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../../components/Input'
import { addPlaceData, removePlaceData, updatePlaceData } from '../../store/slice';
import SlotCard from '../SlotCard';
import { useNavigate } from 'react-router-dom';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export function CustomModal(props) {
  const { slotNum, place, areaProp, setIsBooked } = props;
  console.log("PLACE NAME: ", place)
  const userData = useSelector((state) => state.park.currentUserData);
  const userId = userData._id;

  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("checkingggg")
    const bookSlotFrom = localStorage.getItem("bookingFrom");
    const bookSlotTo = localStorage.getItem("bookingTo");

    if (bookSlotFrom && bookSlotTo) {
      setFrom(dayjs(bookSlotFrom).tz('Asia/Karachi').toDate());
      setTo(dayjs(bookSlotTo).tz('Asia/Karachi').toDate());
    }
  }, []);

  const getPlaceData = async () => {
    axios.get('https://parkingback.vercel.app/getPlace')
      .then((response) => {
        console.log("RESPONSE COMING", response.data)
        let tempData = response.data;
        const customSlotsData = tempData.filter(item => item.areaId === areaProp);
        const specificData = customSlotsData[0]?.placeData;
      })

  }

  const userBooking = async () => {
    try {
      const today = dayjs().tz('Asia/Karachi').utc().toDate();
      const bookingFrom = dayjs(from).tz('Asia/Karachi').utc().toDate();
      const bookingTo = dayjs(to).tz('Asia/Karachi').utc().toDate();
  
      if (bookingFrom && bookingTo && !isNaN(bookingFrom.getTime()) && !isNaN(bookingTo.getTime())) {
        const hours = Math.ceil((bookingTo - bookingFrom) / (1000 * 60 * 60));
        const cost = hours * 2;
  
        const bookingData = [{ placeName: place, slotNumber: slotNum, bookingDate: today, bookingFrom, bookingTo, cost }];
  
        await axios.post('https://parkingback.vercel.app/userbooking', { userId, bookingData });
        await axios.post('https://parkingback.vercel.app/addbooking', { userId, bookingData });
  
       
        dispatch(updatePlaceData({
          areaId: areaProp,
          placeId: place,
          updatedPlace: {
            ...place,
            slots: place.slots ? place.slots.map(slot =>
              slot.slotNumber === slotNum
                ? { ...slot, isBooked: true, bookingFrom, bookingTo }
                : slot
            ) : []
          }
        }));

        setIsBooked(true)
  
        // toast.success('Booking saved successfully!');
       
        // // handleClose(); 
        // navigate('/mybookings');
        toast.success('Booking saved successfully!', {
          autoClose: 1000,
          onClose: () => navigate('/mybookings')
        });
      } else {
        toast.error("Kindly select valid bookingFrom and bookingTo dates");
      }
    } catch (err) {
      toast.error(`Unexpected error: ${err.message}`);
    }
  };
  
  return (
    <React.Fragment>
      <Button variant="contained" color='success' onClick={handleOpen}>Book Now</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box className='custom-modal' sx={{ ...style, width: 400 }}>
          <span className='close-btn' onClick={handleClose}>X</span>

          <h2>Book Slot</h2>
          <div className='slotsContainer'>
            <p>----- Are you sure you want to book the slot? -----</p>
            <Button
              variant='contained'
              className='areaBtn'
              onClick={userBooking}
            >Yes</Button>
            <Button
              variant='contained'
              className='areaBtn'
              onClick={handleClose}
            >No</Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function ChildModal(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.placeName);
  const [slots, setSlots] = useState(props.placeSlots);
  const [placeId, setPlaceId] = useState(props.placeId);
  const [areaId, setAreaId] = useState(props.areaId);
  const [slotDetails, setSlotDetails] = useState(props.slots);
  const role = useSelector((state) => state.park.userRole);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSlotsChange = (e) => {
    setSlots(e.target.value);
  };

  const updateValues = (name, slots, areaId, placeId) => {
    axios.put(`https://parkingback.vercel.app/update-place/${areaId}/${placeId}`, {
      placeName: name,
      slotsQuantity: parseInt(slots)
    })
      .then((res) => {

        const updatedPlace = {
          ...props,
          placeName: name,
          slotsQuantity: parseInt(slots),
        };
        dispatch(updatePlaceData({ areaId, placeId, updatedPlace }));
        toast.success(res.data.message);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      {
        role == 'admin'
          ?
          <Button variant="contained" className="edit-btn" color='success' onClick={handleOpen}>Edit</Button>
          :
          <Button variant="contained" className="edit-btn" color='success' onClick={handleOpen}>Book Now</Button>
      }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        {
          role == 'admin'
            ?
            <Box className='child-modal' sx={{ ...style, width: 500 }}>
              <span className='close-btn' onClick={handleClose}>X</span>
              <h2 style={{ textAlign: 'center' }}>Edit The Values</h2>
              <form>
                <div style={{ textAlign: 'center' }}>
                  <Input
                    type="text"
                    val={name}
                    change={handleNameChange}
                    name="placeName"
                    label="Enter Place Name"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    myclass="inp-Style"
                  />
                  <Input
                    type="text"
                    val={slots}
                    change={handleSlotsChange}
                    name="slotsQuantity"
                    label="No. of Slots"
                    variant="standard"
                    fullWidth
                    margin="normal"
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                  <Button
                    variant='contained'
                    className='updBtn'
                    color='success'
                    onClick={() => updateValues(name, slots, areaId, placeId)}
                  >
                    Update
                  </Button>
                </div>
              </form>
            </Box>
            :
            <Box className='childish-modal' sx={{ ...style, width: 500 }}>
              <span className='close-btn' onClick={handleClose}>X</span>
              <ToastContainer />
              <h2 style={{ textAlign: 'center' }}>All Slots</h2>
             
              <div className='slots-container'>
                {slotDetails?.length > 0 ? (
                  slotDetails.map(item => {
                    return (
                      <SlotCard item={item} areaId={areaId} name={name}/>
                      // <div key={item.slotNumber} className='slots-box'>
                      //   <p>{item.slotNumber}</p>
                      //   <p style={{ display: 'flex', justifyContent: 'center' }}>
                      //     {isBooked ? (
                      //       <Button variant='contained' disabled>Booked</Button>
                      //     ) : (
                      //       <CustomModal areaProp={areaId} place={name} slotNum={item.slotNumber} />
                      //     )}
                      //   </p>
                      // </div>
                    );
                  })
                ) : (
                  <p>No slots available</p>
                )}
              </div>

            </Box>
        }
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal(props) {

  const dispatch = useDispatch();
  //const { placeProp, areaProp } = props;
  const { areaProp } = props;
  const placeDetails = useSelector((state) => state.park.placeData);
  const customData = placeDetails?.filter(item => item.areaId === areaProp);
  const specificData = customData[0]?.placeData;

  const role = useSelector((state) => state.park.userRole);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const deleteData = (placeId) => {
  //   let areaId = customData[0].areaId;
  //   axios.delete(`https://parkingback.vercel.app/delete-place/${areaId}/${placeId}`)
  //     .then((res) => {
  //       let updatedData = specificData.filter(place => place._id !== placeId);
  //       dispatch(addPlaceData(updatedData)); 
  //       setMapData(updatedData); 
  //       toast.success(res.data.message);
  //     })
  //     .catch((res) => {
  //       toast.error(res.response.data.message);
  //     });
  // }

  const deleteData = (placeId) => {
    let areaId = customData[0].areaId;

    axios.delete(`https://parkingback.vercel.app/delete-place/${areaId}/${placeId}`)
      .then((res) => {

        dispatch(removePlaceData({ areaId, placeId }));
        setMapData(prevMapData => prevMapData.filter(place => place._id !== placeId));
        toast.success(res.data.message);
      })
      .catch((res) => {
        toast.error(res.response.data.message);
      });
  }

  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    setMapData(specificData);
  }, [specificData]);

  return (
    <div>
      <span onClick={handleOpen}>VIEW</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >

        <Box className='main-modal' sx={{ ...style, width: 600 }}>
          <span className='close-btn' onClick={handleClose}>X</span>
          <h2 id="parent-modal-title">All Parking Places</h2>
          <div>
            <TableContainer className='tablecontainer_class'>
              <Table className='table_class'>
                <TableHead>
                  <TableRow className='table_head_class'>
                    <TableCell className='tableHeading'>S.No</TableCell>
                    <TableCell className='tableHeading'>Place</TableCell>
                    <TableCell className='tableHeading'>Slots</TableCell>
                    {/* <TableCell className='tableHeading'>Bookings</TableCell> */}
                    <TableCell className='tableHeading'>Operation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {specificData && specificData.map((item, index) => (
                    <TableRow key={index} className='table_head_class'>
                      <TableCell className='tableHeading'>{index + 1}</TableCell>
                      <TableCell className='tableHeading'>{item.placeName}</TableCell>
                      <TableCell className='tableHeading'>{item.slotsQuantity}</TableCell>
                      {/* <TableCell className='tableHeading'>{item.bookings}</TableCell> */}
                      {role == 'admin' ?
                        <TableCell className='tableHeading toggle'>
                          <ChildModal areaId={areaProp} placeId={item._id} placeName={item.placeName} placeSlots={item.slotsQuantity} />
                          <Button variant="contained" className="del-btn" color='error' onClick={() => deleteData(item._id)}>
                            Delete
                          </Button>
                        </TableCell>
                        :
                        <TableCell>
                          <ChildModal areaProp={areaProp} placeName={item.placeName} values={item.slotsQuantity} slots={item.slotsData} />
                        </TableCell>
                      }
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
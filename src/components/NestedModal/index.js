"use client";
import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'react-toastify/dist/ReactToastify.css';
import ModalClose from '@mui/joy/ModalClose';

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

function CustomModal(props) {
  const { slotNum, place, areaProp } = props;
  const userData = useSelector((state) => state.park.currentUserData);
  const userId = userData._id;

  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

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
            console.log("RESPONSE COMING",response.data)
            let tempData = response.data;
            const customSlotsData = tempData.filter(item => item.areaId === areaProp);
            const specificData = customSlotsData[0]?.placeData;
        })
       
}

  const userBooking = () => {
    try {
      const today = dayjs().tz('Asia/Karachi').utc().toDate(); 
      const bookingFrom = dayjs(from).tz('Asia/Karachi').utc().toDate(); 
      const bookingTo = dayjs(to).tz('Asia/Karachi').utc().toDate(); 

      if (bookingFrom && bookingTo && !isNaN(bookingFrom.getTime()) && !isNaN(bookingTo.getTime())) {
        const hours = Math.ceil((bookingTo - bookingFrom) / (1000 * 60 * 60));
        const cost = hours * 2;

        const bookingData = [{ placeName: place, slotNumber: slotNum, bookingDate: today, bookingFrom, bookingTo, cost }];

        axios.post('https://parkingback.vercel.app/userbooking', { userId, bookingData })
          .then(() => {
            toast.success('Booking save successfully!');
          })
          .catch((err) => {
            toast.error(`Error: ${err.response?.data?.message || err.message}`);
          });

        axios.post('https://parkingback.vercel.app/addbooking', { userId, bookingData })
          .then(() => {
            //toast.success('Booking added successfully!');
          })
          .catch((err) => {
            toast.error(`Error: ${err.response?.data?.message || err.message}`);
         //   console.log("RESPONSE catch FROM BE", err.message);
          });
         getPlaceData();  
         
      } else {
        toast.error("Kindly select valid bookingFrom and bookingTo dates");
      }
    } catch (err) {
      toast.error(`Unexpected error: ${err.message}`);
  //    console.log(err);
    }
    //window.location.reload(false);
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Book Now</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
         {/* <ModalClose /> */}
        <Box className='custom-modal' sx={{ ...style, width: 400 }}>
          <ToastContainer />
          <h2>Book Slot</h2>
          <div className='slots-container'>
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
 
  const { values, place, slots, areaProp } = props;
  const[slotDetails, setSlotDetails] = useState(slots);
 
  const myVal = parseInt(values, 10);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>View</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box className='child-modal' sx={{ ...style, width: 500 }}>
          <h2>Total Slots</h2>
          <div className='slots-container'>
            {slotDetails?.map(item => {
           
              const now = dayjs().utc(); 
              const bookingFrom = item.bookFrom ? dayjs(item.bookFrom).utc() : null;
              const bookingTo = item.bookTo ? dayjs(item.bookTo).utc() : null;
              const isBooked = bookingFrom && bookingTo ? now.isSameOrAfter(bookingFrom) && now.isSameOrBefore(bookingTo) : false;
          
              return (
                <div key={item.slotNumber} className='slots-box'>
                  <p>{item.slotNumber}</p>
                  <p>
                    {isBooked ? (
                      <Button variant='contained' disabled>Booked</Button>
                    ) : (
                      <CustomModal areaProp={areaProp} place={place} slotNum={item.slotNumber} />
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal(props) {
  const { placeProp, areaProp } = props;
  const customData = placeProp.filter(item => item.areaId === areaProp);
  const specificData = customData[0]?.placeData;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
          <h2 id="parent-modal-title">All Parking Places</h2>
          <div>
            <TableContainer className='tablecontainer_class'>
              <Table className='table_class'>
                <TableHead>
                  <TableRow className='table_head_class'>
                    <TableCell className='tableHeading'>S.No</TableCell>
                    <TableCell className='tableHeading'>Place</TableCell>
                    <TableCell className='tableHeading'>Slots</TableCell>
                    <TableCell className='tableHeading'>Bookings</TableCell>
                    <TableCell className='tableHeading'>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {specificData && specificData.map((item, index) => (
                    <TableRow key={index} className='table_head_class'>
                      <TableCell className='tableHeading'>{index + 1}</TableCell>
                      <TableCell className='tableHeading'>{item.placeName}</TableCell>
                      <TableCell className='tableHeading'>{item.slotsQuantity}</TableCell>
                      <TableCell className='tableHeading'>{item.bookings}</TableCell>
                      <TableCell className='tableHeading toggle'>
                        <ChildModal areaProp={areaProp} place={item.placeName} values={item.slotsQuantity} slots={item.slotsData} />
                      </TableCell>
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

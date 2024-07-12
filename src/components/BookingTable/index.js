"use client"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

const localTimezone = 'Asia/Karachi'; // Adjust to your local timezone

const BookingTable = () => {
  const [bookingData, setBookingData] = useState([]);
  const userData = useSelector((state) => state.park.currentUserData);
  let userID = userData._id;

  useEffect(() => {
    const fetchBookings = async () => {
      if (userID) {
        try {
          const response = await axios.get(`https://parkingback.vercel.app/getBookings/${userID}`);
          setBookingData(response.data);
        } catch (error) {
          console.error("Error fetching bookings: ", error);
        }
      }
    };
    fetchBookings();
  }, [userID]);

  const convertUTCToLocal = (utcDate) => {
    return dayjs(utcDate).utc().tz(localTimezone).format('YYYY-MM-DD HH:mm:ss'); // Format as needed
  };

  let allBookings = bookingData.filter(item => item.email !== 'admin@gmail.com');

  return (
    <div>
      <TableContainer className='tablecontainer_class'>
        <Table className='table_class'>
          <TableHead>
            <TableRow className='table_head_class'>
              <TableCell className='tableHeading'>S.No</TableCell>
              <TableCell className='tableHeading'>Place Name</TableCell>
              <TableCell className='tableHeading'>Slot No</TableCell>
              <TableCell className='tableHeading'>Booking Date</TableCell>
              <TableCell className='tableHeading'>Booking From</TableCell>
              <TableCell className='tableHeading'>Booking To</TableCell>
              <TableCell className='tableHeading'>Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allBookings && allBookings.map((item, index) =>
              <TableRow key={index} className='table_head_class'>
                <TableCell className='tableHeading'>{index + 1}</TableCell>
                <TableCell className='tableHeading'>{item.placeName}</TableCell>
                <TableCell className='tableHeading'>{item.slotNumber}</TableCell>
                <TableCell className='tableHeading'>{convertUTCToLocal(item.bookingDate)}</TableCell>
                <TableCell className='tableHeading'>{convertUTCToLocal(item.bookingFrom)}</TableCell>
                <TableCell className='tableHeading'>{convertUTCToLocal(item.bookingTo)}</TableCell>
                <TableCell className='tableHeading'>{item.cost}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookingTable;


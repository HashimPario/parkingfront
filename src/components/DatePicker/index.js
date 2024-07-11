import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateTimePickerValue() {

  const [currentDateTime, setCurrentDateTime] = useState(dayjs(new Date()));
  const [bookingFrom, setBookingFrom] = useState(dayjs(new Date()));
  const [bookingTo, setBookingTo] = useState(dayjs().add(10, 'minute'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(dayjs(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookingFrom", bookingFrom.toISOString());
    localStorage.setItem("bookingTo", bookingTo.toISOString());
  }, [bookingFrom, bookingTo]);

  const handleBookingFromChange = (selectedDate) => {
    setBookingFrom(selectedDate);
  };

  const handleBookingToChange = (selectedDate) => {
    setBookingTo(selectedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
        <DateTimePicker
          label="Booking From"
          value={bookingFrom}
          onChange={handleBookingFromChange}
        />
        <DateTimePicker
          label="Booking To"
          value={bookingTo}
          onChange={handleBookingToChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

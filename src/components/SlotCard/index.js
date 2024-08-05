import { Button } from "@mui/material"
import { CustomModal } from "../NestedModal"
import dayjs from "dayjs";
import { useState } from "react";

const SlotCard = (props) => {
    const {item, areaId, name} = props
    const now = dayjs().utc();
    const bookingFrom = item.bookFrom ? dayjs(item.bookFrom).utc() : null;
    const bookingTo = item.bookTo ? dayjs(item.bookTo).utc() : null;
    const [isBooked, setIsBooked] = useState(bookingFrom && bookingTo ? now.isSameOrAfter(bookingFrom) && now.isSameOrBefore(bookingTo) : false)
    return(
        <div key={item.slotNumber} className='slots-box'>
        <p>{item.slotNumber}</p>
        <p style={{ display: 'flex', justifyContent: 'center' }}>
          {isBooked ? (
            <Button variant='contained' disabled>Booked</Button>
          ) : (
            <CustomModal areaProp={areaId} place={name} slotNum={item.slotNumber} setIsBooked={setIsBooked} />
          )}
        </p>
      </div>

    )
}
export default SlotCard
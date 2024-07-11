import React, { useEffect, useState } from 'react'
import SideNav from '../components/SideBar'
import '../screen/style/allparking.css'
import axios from 'axios'
import { areaInitialValues } from '../helper/helper'
import { areaSchema } from '../helper/schema'
import Input from '../components/Input';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NestedModal from '../components/NestedModal'

import DateTimePickerValue from '../components/DatePicker'
const UserParking = () => {

    const [areaData, setAreaData] = useState([]);
    const [placeData, setPlaceData] = useState([]);
    const [open, setOpen] = useState(false)

    let totalSlots = 0;
    let bookings = 0;
    let areaQty = 0;
    let slotQty = 0;

    useEffect(() => {
        getArea();
        getPlace();

    }, [])

    const formik = useFormik({
        initialValues: areaInitialValues,
        validationSchema: areaSchema,
        onSubmit: async (values) => {
            const { areaName } = values;
            try {
                const res = await axios.post('/addArea', {
                    areaName, areaQty, slotQty
                }).then((res) => {
                    toast.success(res.data.message)
                    getArea();
                }).catch((res) => {
                    // toast.error(res)    
                    // console.log(res)
                })
            } catch (err) {
                toast.error('Erorrrrrr')
            }

        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

    const getArea = async () => {
        axios.get('/getArea')
            .then((response) => {
                // console.log(response.data);
                setAreaData(response.data)
            })
    }
    // let tempId = "662bb6169768cc29554c0ca2"
    const getPlace = async () => {
        axios.get('/getPlace')
            .then((response) => {
                // let allPlacesData = response.data;
                // console.log("places dataaaaaaa:",response.data);
                // let specificAreaPlaces = allPlacesData.filter(item => item.areaId == tempId)
                // console.log(specificAreaPlaces[0].placeData.length,"Islamabad PLacessssssss")
                setPlaceData(response.data)
            })
    }
    return (
        <div className='dashboard'>

            <SideNav />

            <div className='main-content'>
                <div>
                    <h2>All Parking</h2>
                </div>
                <ToastContainer />
                <div className='allparking-content'>
                    {
                        areaData.map((item, index) =>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <h2>{item.areaName}</h2>
                                        <p>Total Places: {item.areaQty}</p>
                                        <p>Total Slots: {item.slotQty}</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <p className='card-heading2'>{item.areaName}</p>
                                        <form>
                                            <div>
                                                <DateTimePickerValue />
                                                <span className="area-formik-error">
                                                    {errors.placeName && touched.placeName ? (
                                                        errors.placeName
                                                    ) : null}
                                                </span>
                                            </div>

                                            <div className='card-btn-row2'>

                                                <Button
                                                    variant='contained'
                                                    className='areaBtn'
                                                // onClick={() => addPlace(item._id,values.placeName,values.slotsQuantity)}
                                                >
                                                    <NestedModal placeProp={placeData} areaProp={item._id} />
                                                </Button>

                                                {/* <NestedModal placeProp={placeData} areaProp={item._id}/>   */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default UserParking
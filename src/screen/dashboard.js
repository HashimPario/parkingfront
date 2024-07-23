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
import { useSelector } from 'react-redux';
import { SideBar, SideBarUser } from '../helper/constant'
import DateTimePickerValue from '../components/DatePicker'


const Dashboard = () => {
  const [areaData, setAreaData] = useState([]);
  const [placeData, setPlaceData] = useState([]);
  const [open, setOpen] = useState(false)
  const [sideNavData, setSideNavData] = useState([]);

  const role = useSelector((state) => state.park.userRole);

  const [formValues, setFormValues] = useState({
    placeName: '',
    slotsQuantity: ''
  });

  let totalSlots = 0;
  let bookings = 0;
  let areaQty = 0;
  let slotQty = 0;

  useEffect(() => {
    if (role) {
      setSideNavData(role === 'admin' ? SideBar : SideBarUser);
    }
    getArea();
    getPlace();
  }, [role])

  const formik = useFormik({
    initialValues: areaInitialValues,
    validationSchema: areaSchema,
    onSubmit: async (values, { resetForm }) => {
      const { areaName } = values;
      try {
        const res = await axios.post('https://parkingback.vercel.app/addArea', {
          areaName, areaQty, slotQty
        }).then((res) => {
          toast.success(res.data.message)
          getArea();
          resetForm();
        }).catch((res) => {
          // toast.error(res)    
          // console.log(res)
        })
      } catch (err) {
        toast.error('error araha he')
      }

    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  const getArea = async () => {
    axios.get('https://parkingback.vercel.app/getArea')
      .then((response) => {
        // console.log(response.data);
        setAreaData(response.data)
      })
  }

  const getPlace = async () => {
    axios.get('https://parkingback.vercel.app/getPlace')
      .then((response) => {
        setPlaceData(response.data)
      })
  }

  const addPlace = async (areaId, placeName, slotsQuantity) => {
    try {
      let slotsData = [];
      for (let i = 0; i < parseInt(slotsQuantity); i++) {
        slotsData.push({
          slotNumber: i + 1,
          bookingDate: '',
          bookFrom: '',
          bookTo: ''
        });
      }
      const bookings = [];
      let placeData = [{ placeName, slotsQuantity: parseInt(slotsQuantity), bookings, slotsData }];
      totalSlots = parseInt(totalSlots) + parseInt(slotsQuantity);
      const res = await axios.post(`https://parkingback.vercel.app/addPlace/${areaId}`, { areaId, totalSlots, placeData, slotsData });
      //  console.log("RESPONSEEEEEE", res.data.message);
      toast.success(res.data.message);
      getPlace();
      getArea();
      setFormValues({ placeName: '', slotsQuantity: '' });
    } catch (err) {
      // console.log(err.response?.data?.message || 'An error occurred');
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  }
  const handleChangeVal = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }
  return (
    <div className='dashboard'>
      <SideNav />
      {role === 'admin' ?
        <div className='main-content'>
          <div>
            <h2>Dashboard</h2>
          </div>
          <ToastContainer />
          <div className='allparking-content'>

            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <AddIcon style={{ fontSize: "54px" }} />
                  <p>Add Parking Area</p>
                </div>
                <div className="flip-card-back">
                  <p className='card-heading'>Add Area</p>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <Input
                        type="text"
                        change={handleChange}
                        val={values.areaName}
                        name="areaName"
                        label="Enter Area Name"
                        variant="standard"
                      />
                      <span className="area-formik-error">
                        {errors.areaName && touched.areaName ? (
                          errors.areaName
                        ) : null}
                      </span>
                    </div>
                    <div className='card-btn-row'>
                      <Button
                        variant='contained'
                        type="submit"
                        className='areaBtn'
                      >
                        ADD
                      </Button>
                    </div>


                  </form>
                </div>
              </div>
            </div>

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
                      <p className='card-heading'>{item.areaName}</p>
                      <form>
                        <div>
                          <Input
                            type="text"
                            change={handleChangeVal}
                            val={formValues.placeName}
                            name="placeName"
                            label="Enter Place Name"
                            // myclass="inputStyle"
                            variant="standard"
                          />
                          <span className="area-formik-error">
                            {errors.placeName && touched.placeName ? (
                              errors.placeName
                            ) : null}
                          </span>
                        </div>
                        <div>
                          <Input
                            type="text"
                            change={handleChangeVal}
                            val={formValues.slotsQuantity}
                            name="slotsQuantity"
                            label="No. of Slots"
                            // myclass="inputStyle"
                            variant="standard"
                          />
                          <span className="area-formik-error">
                            {errors.slotsQuantity && touched.slotsQuantity ? (
                              errors.slotsQuantity
                            ) : null}
                          </span>
                        </div>
                        <div style={{display:'flex'}}>
                          <div className='card-btn-row2'>
                            <Button
                              variant='contained'
                              className='areaBtn'
                              onClick={() => addPlace(item._id, formValues.placeName, formValues.slotsQuantity)}
                            >
                              ADD
                            </Button>
                          </div>
                          <div className='card-btn-row2'>
                            <Button
                              variant='contained'
                              className='areaBtn'
                            >
                              <NestedModal placeProp={placeData} areaProp={item._id} />
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        :
        <div className='main-content'>
          <div>
            <h2>Dashboard</h2>
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
                          >
                            <NestedModal placeProp={placeData} areaProp={item._id} />
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      }
    </div>
  )
}
export default Dashboard;
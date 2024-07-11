import React, { useEffect, useState } from 'react'
import SideNav from '../components/SideBar'
import './style/profile.css'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { Button } from '@mui/material'
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { profileInitialValues } from '../helper/helper'
import { profileSchema } from '../helper/schema'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector } from "react-redux"

const Profile = () => {

  const userDetail = useSelector((state) => state.park.currentUserData);
  const userId = sessionStorage.getItem('token')
  const [eye, setEye] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [eye3, setEye3] = useState(false);

  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: profileInitialValues,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      const { name, oldPassword, newPassword, confirmPassword } = values;
      try {
        const res = await axios.post(`/updateprofile/${userId}`, { name, oldPassword, newPassword });
        toast.success(res.data.message);
      }
      catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred");
        }
      }
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <div className='dashboard'>
      <SideNav />

      <div className='main-content'>
        <div>
          <h2>Profile</h2>
        </div>
        <div className='profile-content'>
          <h3>Profile Details</h3>
          <ToastContainer />
          <form onSubmit={handleSubmit}>

            <div className='form-row'>
              <div>
                <Input
                  type="name"
                  change={handleChange}
                  val={userDetail?.name}
                  name="name"
                 // label="Name"
                  myclass="inputStyle"
                  variant="standard"
                  disable
                />
              </div>
              <div>
                <Input
                  type="email"
                  val={userDetail?.email}
                  name="email"
                 // label="Email"
                  myclass="inputStyle"
                  variant="standard"
                  disable
                />
              </div>
            </div>

            <div className='form-row'>
              <div>
                <Input
                  type={eye ? "text" : "password"}
                  change={handleChange}
                  val={values.oldPassword}
                  name="oldPassword"
                  label="Old Password"
                  myclass="inputStyle2"
                  variant="standard"
                />
                {values.oldPassword !== ""
                  ?
                  <div onClick={eye ? () => setEye(false) : () => setEye(true)} className="eye">
                    {!eye ?
                      <VisibilityOffIcon className='eye-style' />
                      :
                      <VisibilityIcon className='eye-style' />
                    }
                  </div>
                  :
                  false
                }
                <span className="formik-error">
                  {errors.oldPassword && touched.oldPassword ? (
                    errors.oldPassword
                  ) : null}
                </span>
              </div>
              <div>
                <Input
                  type={eye2 ? "text" : "password"}
                  change={handleChange}
                  val={values.newPassword}
                  name="newPassword"
                  label="New Password"
                  myclass="inputStyle2"
                  variant="standard"
                />
                {values.newPassword !== ""
                  ?
                  <div onClick={eye2 ? () => setEye2(false) : () => setEye2(true)} className="eye">
                    {!eye2 ?
                      <VisibilityOffIcon className='eye-style' />
                      :
                      <VisibilityIcon className='eye-style' />
                    }
                  </div>
                  :
                  false
                }
                <span className="formik-error">
                  {errors.newPassword && touched.newPassword ? (
                    errors.newPassword
                  ) : null}
                </span>
              </div>
              <div>
                <Input
                  type={eye3 ? "text" : "password"}
                  change={handleChange}
                  val={values.confirmPassword}
                  name="confirmPassword"
                  label="Confirm Password"
                  myclass="inputStyle2"
                  variant="standard"
                />
                {values.confirmPassword !== ""
                  ?
                  <div onClick={eye3 ? () => setEye3(false) : () => setEye3(true)} className="eye">
                    {!eye3 ?
                      <VisibilityOffIcon className='eye-style' />
                      :
                      <VisibilityIcon className='eye-style' />
                    }
                  </div>
                  :
                  false
                }
                <span className="formik-error">
                  {errors.confirmPassword && touched.confirmPassword ? (
                    errors.confirmPassword
                  ) : null}
                </span>
              </div>
            </div>
            <div className='btn-row'>
              <Button
                variant='contained'
                type="submit"
                className='profileBtn'
              >
                UPDATE PASSWORD
              </Button>
            </div>


          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
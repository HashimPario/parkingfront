import React, { useState } from 'react'
import './auth.css'
import Input from '../components/Input'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import { registerInitialValues } from '../helper/helper'
import { registerSchema } from '../helper/schema'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios'

const Register = () => {

  const [eye, setEye] = useState(false)
  const [eye2, setEye2] = useState(false)
  let isBlocked = "false";

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const { name, email, password } = values;
      try {
        const res = await axios.post('/register', { name, email, password, isBlocked });
        toast.success(res.data.message);
        //console.log("RESPONSE FROM BE", res.data);
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
          console.log("RESPONSE catch FROM BE", error.response.data.message);
        } else {
          toast.error("An error occurred");
        }
      }
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <div className='wrapper'>
      <div className='mainDiv'>
        <ToastContainer />
        <div className='content'>
          <h1>REGISTER</h1>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              change={handleChange}
              val={values.name}
              name="name"
              label="Name"
              myclass="inputStyle"
              variant="standard"
            />
            <span className="formik-error">
              {errors.name && touched.name ? (
                errors.name
              ) : null}
            </span>
            <Input
              type="email"
              change={handleChange}
              val={values.email}
              name="email"
              label="Email"
              myclass="inputStyle"
              variant="standard"
            />
            <span className="formik-error">
              {errors.email && touched.email ? (
                errors.email
              ) : null}
            </span>
            <div style={{ position: 'relative', width: '90%' }}>
              <Input
                type={eye ? "text" : "password"}
                myclass="inp-pass"
                change={handleChange}
                val={values.password}
                name="password"
                label="Password"
                variant="standard"
              />
              {values.password !== ""
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
            </div>
            <span className="formik-error">
              {errors.password && touched.password ? (
                errors.password
              ) : null}
            </span>
            <div style={{ position: 'relative', width: '90%' }}>
              <Input
                type={eye2 ? "text" : "password"}
                myclass="inp-pass"
                change={handleChange}
                val={values.confirmPassword}
                name="confirmPassword"
                label="Confirm Password"
                variant="standard"
              />
              {values.confirmPassword !== ""
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
            </div>
            <span className="formik-error">
              {errors.confirmPassword && touched.confirmPassword ? (
                errors.confirmPassword
              ) : null}
            </span>
            <Button
              variant='contained'
              type="submit"
              className='btnStyle'
            >
              REGISTER
            </Button>

            <p>Already have an account? <span onClick={() => navigate('/')}>Login</span> </p>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Register;
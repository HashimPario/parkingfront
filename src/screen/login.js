import React, { useEffect, useState } from 'react'
import './auth.css'
import Input from '../components/Input'
import InputPass from '../components/InputPass'
import { Button } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import { loginInitialValues } from '../helper/helper'
import { loginSchema } from '../helper/schema'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser, setUserRole } from '../store/slice';

const Login = () => {
  const [eye, setEye] = useState(false);
  const [btnDisable, setBtnDisable] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token;

  useEffect(() => {
    token = sessionStorage.getItem('token');
    if (token) return navigate('/dashboard');
  }, [navigate]);

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginSchema,
    onSubmit: async (values,  { resetForm }) => {
      setBtnDisable("true");
      const { email, password } = values;
      try {
        const res = await toast.promise(
          axios.post('https://parkingback.vercel.app/login', { email, password }),
          {
            pending: 'Logging in...',
            success: 'Login successful!',
            error: {
              render({ data }) {
                setBtnDisable("false");
                return data.response?.data?.message || 'An error occurred'; 
              }      
            }
          }
        );
        
        const userRole = res.data.user.role;
        sessionStorage.setItem('token', res.data.user._id);
        dispatch(addUser(res.data.user));
        dispatch(setUserRole(userRole));
        resetForm();
        navigate('/dashboard');
        setTimeout(() => {
          
        }, 500);
      } catch (error) {
      
      }
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <div className='wrapper'>
      <div className='mainDiv'>
        <ToastContainer />
        <div className='content'>
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit}>
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
            <div style={{ position: 'relative', width: '100%', textAlign:'center' }}>
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

            <Button
              variant='contained'
              type="submit"
              className='btnStyle'
              disabled={btnDisable === 'true'}
            >
              LOGIN
            </Button>

            <p>Don't have an account? <span onClick={() => navigate('/register')}>Register</span> </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
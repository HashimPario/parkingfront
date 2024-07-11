import * as Yup from 'yup';

export const registerSchema = () => {
    return (
        Yup.object({
            name: Yup.string()
                .min(3, 'Min 3 characters')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string()
                .email('Invalid Email')
                .required('Required'),
            password: Yup.string()
                .min(8, 'Password must have atleast 8 characters')
                .max(20, 'Must be 20 characters or less')
                .matches(/[0-9]/, "Atleast 1 digit in password is required")
                .matches(/[a-z]/, "1 lowercase alphabet is required")
                .matches(/[A-Z]/, "1 uppercase alphabet is required")
                .required('Required'),
            confirmPassword: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('password'), null], 'Must match "password" field value'),
        })
    )
}


export const loginSchema = () => {
    return (
        Yup.object({
            email: Yup.string()
                .email('Invalid Email')
                .required('Required'),
            password: Yup.string()
                .min(8, 'Password must have atleast 8 characters')
                .max(20, 'Must be 20 characters or less')
                .matches(/[0-9]/, "Atleast 1 digit in password is required")
                .matches(/[a-z]/, "1 lowercase alphabet is required")
                // .matches(/[A-Z]/, "1 uppercase alphabet is required")
                .required('Required'),
        })
    )
}


export const profileSchema = () => {
    return (
        Yup.object({
            oldPassword: Yup.string()
                .min(8, 'Password must have atleast 8 characters')
                .max(20, 'Must be 20 characters or less')
                .matches(/[0-9]/, "Atleast 1 digit in password is required")
                .matches(/[a-z]/, "1 lowercase alphabet is required")
                .matches(/[A-Z]/, "1 uppercase alphabet is required")
                .required('Required'),
            newPassword: Yup.string()
                .min(8, 'Password must have atleast 8 characters')
                .max(20, 'Must be 20 characters or less')
                .matches(/[0-9]/, "Atleast 1 digit in password is required")
                .matches(/[a-z]/, "1 lowercase alphabet is required")
                .matches(/[A-Z]/, "1 uppercase alphabet is required")
                .required('Required'),
            confirmPassword: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('newPassword'), null], 'Must match "password" field value'),
        })
    )
}

export const areaSchema = () => {
    return (
        Yup.object({
            areaName: Yup.string()
               
                .min(3, 'Area must have atleast 3 characters')
                .required('Required'),
        })
    )
}

export const placeSchema = () => {
    return (
        Yup.object({
            placeName: Yup.string()
               
                .min(3, 'Area must have atleast 3 characters')
                .required('Required'),
        })
    )
}

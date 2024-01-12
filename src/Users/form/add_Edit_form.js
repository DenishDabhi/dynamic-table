// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Zoom } from '@mui/material';
import { useFormik } from 'formik';
import { InitialValues, ValidationSchema } from '../schema/initialvalue';
import { AddData, EditData } from '../../Api/api';
import '../style/form.css'
import { user } from '../../Context/UserContext';
import CustomToastify from '../../Component/toast/toast';
import { toast } from 'react-toastify';

export default function AddEditForm({ title, allData, name, datas, id }) {

    const [open, setOpen] = useState(false);
    const { edit, setEdit } = useContext(user);
    const { isEdit, setIsEdit } = useContext(user);

    const handleClickOpen = () => {
        if (isEdit === true) {
            setEdit(true);
        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setEdit(false);
        setIsEdit(false);
        formik.resetForm();
    };

    const submitData = async (values) => {
        if (isEdit === false) {
            let response = await AddData(values);
            if (response?.status === 201) {
                allData();
                handleClose();
                CustomToastify(toast.success, 'Data Added Succesfully', toast.POSITION.BOTTOM_RIGHT);
            } else {
                CustomToastify(toast.error, 'Request Fail !!', toast.POSITION.BOTTOM_RIGHT);

            }
        } else {
            let response = await EditData(id, values);
            if (response?.status === 200) {
                allData();
                setEdit(false);
                setIsEdit(false);
                formik.resetForm();
                CustomToastify(toast.success, 'Data Updated Succesfully', toast.POSITION.BOTTOM_RIGHT);
            } else {
                CustomToastify(toast.error, 'Request Fail !!', toast.POSITION.BOTTOM_RIGHT);
            }
        }
    };

    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: ValidationSchema,
        onSubmit: (values) => submitData(values),
    });

    useEffect(() => {
        if (isEdit === true) {
            formik?.setValues(datas);
        }
    }, [isEdit]);

    return (
        <>
            <div className='btn-div'>
                <Button variant="outlined" onClick={handleClickOpen} className='addButton'>
                    + {title}
                </Button>
            </div>
            <Dialog
                open={edit === true ? edit : open}
                TransitionComponent={Zoom}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
            >
                <DialogTitle sx={{ fontFamily: 'Mate SC', fontWeight: 'bold', fontSize: '25px', color: 'var(--comon-color)' }}>{name}</DialogTitle>
                <div className='myForm'>
                    <form onSubmit={formik?.handleSubmit} className='form'>
                        <TextField
                            variant='standard'
                            label="First Name"
                            name='first_Name'
                            id='first_Name'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik?.values?.first_Name}
                            className='textField'

                        />
                        {formik?.errors?.first_Name && formik?.touched?.first_Name && (
                            <div className='error_msg'>{formik?.errors?.first_Name}</div>
                        )}
                        <TextField
                            variant='standard'
                            label="Last Name"
                            name='last_Name'
                            id='last_Name'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik?.values?.last_Name}
                            className='textField'
                        />
                        {formik?.errors?.last_Name && formik?.touched?.last_Name && (
                            <div className='error_msg'>{formik?.errors?.last_Name}</div>
                        )}
                        <TextField
                            variant='standard'
                            label="Mobile"
                            name='contact'
                            id='contact'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik?.values?.contact}
                            className='textField'
                        />
                        {formik?.errors?.contact && formik?.touched?.contact && (
                            <div className='error_msg'>{formik?.errors?.contact}</div>
                        )}
                        <TextField
                            variant='standard'
                            label="Email"
                            name='email'
                            id='email'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik?.values?.email}
                            className='textField'
                        />
                        {formik?.errors?.email && formik?.touched?.email && (
                            <div className='error_msg'>{formik?.errors?.email}</div>
                        )}
                        <TextField
                            variant='standard'
                            label="Password"
                            name='password'
                            id='password'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik?.values?.password}
                            className='textField'
                        />
                        {formik?.errors?.password && formik?.touched?.password && (
                            <div className='error_msg'>{formik?.errors?.password}</div>
                        )}
                        <label className='my_lable' style={{ color: 'var(--comon-color)' }}>Gender</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1"
                                onChange={formik.handleChange}
                                value='Male'
                                checked={formik?.values?.gender === 'Male'}

                            />
                            <label className="form-check-label" for="flexRadioDefault1" name='gender' style={{ color: 'var(--comon-color)' }}>
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault2"
                                onChange={formik.handleChange}
                                value='Female'
                                checked={formik?.values?.gender === 'Female'}
                            />
                            <label className="form-check-label" for="flexRadioDefault2" name='gender' style={{ color: 'var(--comon-color)' }}>
                                Female
                            </label>
                        </div>
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <DialogActions sx={{ paddingTop: '20px',paddingBottom:'20px' }}>
                                <Button type='submit' className='add_Button'>Submit</Button>
                                <Button onClick={handleClose} className='close_button'>Cancel</Button>
                            </DialogActions>
                        </div>
                    </form>
                </div>

            </Dialog>
        </>
    );
}

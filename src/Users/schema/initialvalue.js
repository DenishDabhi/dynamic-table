import * as Yup from 'yup';

let InitialValues = {
    first_Name:'',
    last_Name:'',
    contact:'',
    email:'',
    password:'',
    gender:{
        male: 'Male',
        female: 'Female',
      }
}

const ValidationSchema = Yup.object().shape({
    first_Name: Yup.string().required('Name required*'),
    last_Name: Yup.string().required('Last name required*'),
    contact: Yup.string().required('Mobile required*').min(10,'Mobile no must be 10 '),
    email: Yup.string().required('Email required*').email('Invalid email'),
    password: Yup.string().required('Password required*').min(5,'Password must be 5 '),
    gender: Yup.string().required('Gender is Required*'),
})

export {InitialValues,ValidationSchema}
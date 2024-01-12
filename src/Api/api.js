import axios from "axios"

export const GetData = async ()=>{
    const mydata = await axios.get(`https://655ef616879575426b443cfe.mockapi.io/data`);
    return mydata
}

export const DeleteApi = async(id)=>{
    const deleteData = await axios.delete(`https://655ef616879575426b443cfe.mockapi.io/data/${id}`);
    return deleteData 
}
export const getOneData = async(id)=>{
    const oneData = await axios.get(`https://655ef616879575426b443cfe.mockapi.io/data/${id}`);
    return oneData 
}

export const AddData = async (values)=>{
    const addData = await axios.post(`https://655ef616879575426b443cfe.mockapi.io/data/`,values);
    return addData
}

export const EditData = async(id,values)=>{
    const editData = await axios.put(`https://655ef616879575426b443cfe.mockapi.io/data/${id}`,values);
    return editData
}
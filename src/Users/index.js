// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react'
import { DeleteApi, GetData, getOneData } from '../Api/api'
import DataTable from '../Component/dataTable/dataTable';
import { DeleteButton, EditButton, } from '../Component/button/button';
import AddEditForm from './form/add_Edit_form';
import { user } from '../Context/UserContext';
import CustomToastify from '../Component/toast/toast';
import { toast } from 'react-toastify';
import CustomSwal from '../Component/swal/swal';

const UserTable = () => {
  const [ApiData, setApiData] = useState([]);
  const { edit, setEdit } = useContext(user);
  const { isEdit, setIsEdit } = useContext(user);
  const [datas, setDatas] = useState([]);
  const [id,setId] = useState(0)
  const allData = async () => {
    const response = await GetData();
    if (response?.status === 200) {
      setApiData(response?.data);
    }
  }

console.log(isEdit);
  const handleDelete = async (id) => {
    const confirmDelete = await CustomSwal("Delete!", "Do you want to Delete", "#3385ff", "red");
    if (confirmDelete.isConfirmed) {
      try{
        let response = await DeleteApi(id);
        if (response?.status === 200) {
          allData();
          CustomToastify(toast.success, 'Data Deleted Successfully', toast.POSITION.BOTTOM_RIGHT);
        }else{
          CustomToastify(toast.error, 'Request Fail !!', toast.POSITION.BOTTOM_RIGHT);
        }
      }catch (error) {
        console.error("Error deleting user:", error);
    }
  }
}
  const handleEdit = async (id) => {
  
    let response = await getOneData(id);
    if (response?.status === 200) {
      setDatas(response?.data);
      setIsEdit(true);
      setEdit(true);
      setId(id)
    }
  }

  useEffect(() => {
    allData();
  }, []);

  const columns = [
    { Header: 'First Name', Accessor: 'first_Name',disableSortBy:false,filter:false },
    { Header: 'Last Name', Accessor: 'last_Name',disableSortBy:false,filter:false  },
    { Header: 'Contact No', Accessor: 'contact', },
    { Header: 'Gender', Accessor: 'gender' },
    { Header: 'Email', Accessor: 'email' },
    // { Header: 'Password', Accessor: 'password' },
    {
      Header: 'Action', Accessor: 'action',
      Cell: (row) => (
        <>
          <span style={{ display: 'flex' }}>
            <EditButton func={() => handleEdit(row?.row?.id, "Edit")} />
            <DeleteButton func={() => handleDelete(row?.row?.id, "Delete")} />
          </span>
        </>
      )
    },
  ];


  const data = ApiData;

  return (
    <>
      <div className='set'>
        <div className='main_div'>
          <AddEditForm title="Add" allData={allData} datas={datas} id={id} name={`${!edit ? "Add" : "Edit"} User`} />
          <DataTable data={data} columns={columns} />
        </div>
      </div>
    </>
  )
}

export default UserTable;

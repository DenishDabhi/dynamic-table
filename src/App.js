import React from 'react';
import './App.css';
import UserTable from './Users';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <UserTable />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;

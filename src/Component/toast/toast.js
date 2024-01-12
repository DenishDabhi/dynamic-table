import 'react-toastify/dist/ReactToastify.css';

const CustomToastify = (type, message, position) => {

    return type(message, {
        position,
        autoClose: 1000,
        style: {
            fontSize: '15px',
        },
    });
}

export default CustomToastify; 
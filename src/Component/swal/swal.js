// @ts-nocheck
import Swal from 'sweetalert2';
import '../swal/style/style.css'

const CustomSwal = async (title, text, confirmButtonColor, cancelButtonColor) => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor,
    confirmButtonColor,
    customClass: {
      container: 'custom-swal-container',
      button: 'custom-swal-button',
    },
  });
};

export default CustomSwal;
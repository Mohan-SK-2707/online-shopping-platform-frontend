import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuccessToast = ({ message }) => {
    toast.success(message);
    return null; 
};

export default SuccessToast;

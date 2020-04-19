import { toast } from 'react-toastify';

export default function errorHandling(err) {
  if (err.response) {
    toast.error(err.response.data.error);
  } else {
    toast.error(err.message);
  }
}

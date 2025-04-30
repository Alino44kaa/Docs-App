import { toast } from 'react-toastify';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
} from '@/types/SearchFieldsType';

const validateSearch = (
  search: SearchBookFieldsType | SearchRatingFieldsType
) => {
  return Object.entries(search).some(([, { field }]) => {
    if (typeof field === 'string') {
      return field.length === 1 || field.length > 255;
    }
    return false;
  })
    ? (toast.warn(
        'Длина полей поиска должна быть от 2 до 255 символов!'
      ),
      false)
    : true;
};

export default validateSearch;

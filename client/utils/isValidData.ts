import BookType from '@/types/BookType';
import FieldsType from '@/types/FieldsType';
import { toast } from 'react-toastify';

const VALID_IMAGE_DOMAINS = ['books.google.com', 'coverart.oclc.org'] as const;

const isValidBook = (book: Partial<BookType>, isCreateRequest: boolean) => {
  const trimmedBook = Object.fromEntries(
    Object.entries(book).map(([key, value]) => [
      key,
      typeof value === 'string' ? value.trim() : value,
    ])
  ) as BookType;
  if (!trimmedBook.title && isCreateRequest) {
    toast.warn('Название обязательно!');
    return false;
  }

  if (
    Object.values(trimmedBook).some(
      (value) => value && (value as string).length < 2
    )
  ) {
    toast.warn('Длина поля должна быть не менее 2 символов.');
    return false;
  }

  if (
    trimmedBook.publishedDate &&
    !/^\d{4}(-\d{2})?(-\d{2})?$/.test(trimmedBook.publishedDate)
  ) {
    toast.warn('Дата публикации должна быть в формате YYYY, YYYY-MM или YYYY-MM-DD');
    return false;
  }

  if (
    trimmedBook.image &&
    !VALID_IMAGE_DOMAINS.some((domain) =>
      (trimmedBook.image as string).startsWith(`https://${domain}`)
    )
  ) {
    toast.warn(
      'URL изображения недействителен. Допустимые домены: coverart.oclc.org и books.google.com'
    );
    return false;
  }

  if (trimmedBook.infoLink && !trimmedBook.infoLink.startsWith('https://')) {
    toast.warn('URL информационной ссылки недействителен');
    return false;
  }

  return true;
};

const isValidData = (
  type: 'book' | 'rating' | 'user',
  data: FieldsType,
  isCreateRequest: boolean = true
) => {
  switch (type) {
    case 'book': {
      return isValidBook(data as Partial<BookType>, isCreateRequest);
    }
    case 'rating': {
      return true;
    }
    case 'user': {
      return true;
    }
    default:
      return false;
  }
};

export default isValidData;

export const validateBook = (book) => {
  const errors = {};

  if (!book.title?.trim()) {
    errors.title = 'Title is required';
  }

  if (!book.author?.trim()) {
    errors.author = 'Author is required';
  }

  if (!book.isbn?.trim()) {
    errors.isbn = 'ISBN is required';
  } else if (!/^\d{10,13}$/.test(book.isbn.replace(/-/g, ''))) {
    errors.isbn = 'ISBN must be 10 or 13 digits';
  }
  

  if (!book.publishedDate) {
    errors.publishedDate = 'Published date is required';
  }

  if (!book.genre?.trim()) {
    errors.genre = 'Genre is required';
  }

  if (book.copiesAvailable === undefined || book.copiesAvailable === '') {
    errors.copiesAvailable = 'Number of copies is required';
  } else if (isNaN(book.copiesAvailable) || book.copiesAvailable < 0) {
    errors.copiesAvailable = 'Number of copies must be a positive number';
  }

  return errors;
};

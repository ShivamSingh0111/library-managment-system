exports.validateBook = (data) => {
  const errors = [];
  if (!data.title) errors.push({ field: 'title', message: 'Title is required' });
  if (!data.author) errors.push({ field: 'author', message: 'Author is required' });
  if (!data.ISBN) errors.push({ field: 'ISBN', message: 'ISBN is required' });
  if (!data.publishedDate)  errors.push({ field: 'publishedDate', message: 'Published Date is required' });
  const isbnRegex = /^(?:\d{9}[\dxX]|\d{13})$/;
  if (data.ISBN && !isbnRegex.test(data.ISBN)) {
    errors.push({ field: 'ISBN', message: 'Invalid ISBN format' });
  }
  if (data.publishedDate && new Date(data.publishedDate) > new Date()) {
    errors.push({ field: 'publishedDate', message: 'Published date cannot be in the future' });
  }
  if (data.genre === 'Academic' && (!data.copiesAvailable || data.copiesAvailable < 5)) {
    errors.push({ field: 'copiesAvailable', message: 'Academic books must have at least 5 copies available' });
  }
  return { valid: errors.length === 0, errors };
};
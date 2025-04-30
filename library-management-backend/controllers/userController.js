const User = require('../models/User');
const Book = require('../models/Book');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password, // In a real app, you should hash the password
      role: isAdmin ? 'admin' : 'user',
      isAdmin: isAdmin || false
    });

    await user.save();
    
    // Don't send password in response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json(userResponse);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // In a real app, you should verify the password hash
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Don't send password in response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json(userResponse);
  } catch (error) {
    next(error);
  }
};

exports.borrowBook = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const book = await Book.findById(req.body.bookId);
    if (!user || !book) return res.status(404).json({ message: 'User or Book not found' });

    user.borrowedBooks.push({ bookId: book.id, borrowDate: new Date().toISOString() });
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.returnBook = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const idx = user.borrowedBooks.findIndex(b => b.bookId === req.body.bookId && !b.returnDate);
    if (idx === -1) return res.status(400).json({ message: 'Book not currently borrowed' });

    user.borrowedBooks[idx].returnDate = new Date().toISOString();
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};
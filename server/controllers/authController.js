const {User} = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { firstName, lastName, email, company, password } = req.body;

  if(!firstName || !lastName || !email || !company || !password){
    return res.status(400).json({message: "Incomplete credentials"});
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, company, password: hashedPassword });

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30m' });

    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


module.exports = {register, login};

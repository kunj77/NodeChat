import { Request, Response } from 'express';
import User, { IUser } from 'db/models/User';
import jwt from 'jsonwebtoken';

// This would ideally come from a vault 
const JWT_SECRET = 'gc8/bQ1YhyVYzmyX66Dpf5bknmulu4rHSI60EsyHUOg=';

export const register = async (req: Request, res: Response) => {
  const { fullName, username, password } = req.body;

  if (!fullName || !username || !password) {
    res.status(400).json({ message: 'Full Name, username and password are required' });
    return;
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    const newUser: IUser = new User({ fullName, username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered' });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return;
  }

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    const { password: userPassword, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ message: 'User logged in', token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
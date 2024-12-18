import { Request, Response } from 'express';
import User, { IUser } from 'db/models/User';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find({});
        const usersWithoutPassword = users.map(user => {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        });
        res.status(200).json(usersWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};
import userService from '../service/user.service.js';
import Joi from 'joi';

const registerUser = async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(6).required()
    });
    try {
        await schema.validateAsync(req.body);
        const { username, password } = req.body;
        const user = await userService.registerUser(username, password);
        const { password: _p, ...safeUser } = user;
        res.status(201).json({ message: 'User registered successfully', user: safeUser });
    } catch(error) {
        const status = error.isJoi ? 400 : (error.status || 500);
        const message = error.isJoi ? error.details[0].message : error.message;
        res.status(status).json({ message });
        return;
    }
}

const loginUser = async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(6).required()
    });
    try {
        await schema.validateAsync(req.body);
        const { username, password } = req.body;
        const user = await userService.loginUser(username, password);
        if (!user) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }
        const { password: _p, ...safeUser } = user;
        res.status(200).json({ message: 'Login successful', user: safeUser });
    } catch(error) {
        const status = error.isJoi ? 400 : (error.status || 500);
        const message = error.isJoi ? error.details[0].message : error.message;
        res.status(status).json({ message });
        return;
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.username);
        if(!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default {
    registerUser,
    loginUser,
    deleteUser
};
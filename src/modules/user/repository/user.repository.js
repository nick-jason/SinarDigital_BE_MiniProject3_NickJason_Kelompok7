import db from '../../../helpers/db.js';
import bcrypt from 'bcrypt';

const User = db.user;

const createUser = async (username, password) => {
    // if (!username || typeof username !== 'string') {
    //     const e = new Error('Username must be a valid string');
    //     e.status = 400;
    //     throw e;
    // }
    // if (!password || typeof password !== 'string') {
    //     const e = new Error('Password must be a valid string');
    //     e.status = 400;
    //     throw e;
    // }
    const salt = bcrypt.genSaltSync(13);
    const hash = await bcrypt.hash(password, salt);
    try {
        const newUser = await User.create({
            data: {
                username,
                password: hash
            }
        });
        return newUser;
    } catch (err) {
        // Prisma unique constraint error
        if (err && (err.code === 'P2002' || err.meta?.target?.includes('username'))) {
            const e = new Error('Username already exists');
            e.status = 409;
            throw e;
        }
        throw err;
    }
}

const loginUser = async (username, password) => {
    const user = await User.findUnique({
        where: {
            username: username,
            password: password
        }
    });
    return user;
}

const deleteUser = async (username) => {
    try {
        const deletedUser = await User.delete({
            where: {
                username: username
            }
        });
        return deletedUser;
    } catch (err) {
        // If record not found, return null instead of throwing
        if (err && err.code === 'P2025') {
            return null;
        }
        throw err;
    }
}

export default {
    createUser,
    loginUser,
    deleteUser
};
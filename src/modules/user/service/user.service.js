import userRepository from '../repository/user.repository.js';
import bcrypt from 'bcrypt';

const registerUser = async (username, password) => {
    return await userRepository.createUser(username, password);
}

const loginUser = async (username, password) => {
    const user = await userRepository.findUser(username);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;
    // Do not return password
    const { password: _p, ...safeUser } = user;
    return safeUser;
}

const deleteUser = async (username) => {
    return await userRepository.deleteUser(username);
}

export default {
    registerUser,
    loginUser,
    deleteUser
};
import express from 'express';
import bcrypt from 'bcrypt';
import userData from '../data/userData.json' with { type: 'json' };

const router = express.Router();
const user = userData.users || [];

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const findUser = user.find(u => u.username === username);
    if(!findUser) {
        res.send('User not found');
        return;
    }
    const isValid = await bcrypt.compare(password, findUser.password);
    if(!isValid) {
        res.send('Invalid password');
        return;
    }

    res.send('Login successful');
});

export default router;
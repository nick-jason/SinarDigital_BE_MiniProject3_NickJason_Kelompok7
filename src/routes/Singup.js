import express from 'express';
import bcrypt from 'bcrypt';
import userData from '../data/userData.json' with { type: 'json' };

const router = express.Router();
const user = userData.users || [];

router.post('/', async (req, res) => {
    // Hashing password
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(13);
    const hash = await bcrypt.hash(password, salt);
    user.push({
        username,
        password: hash
    }),
    console.log(user);

    res.send('User registered successfully');
});

export default router;
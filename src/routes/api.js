import userController from '../modules/user/controller/user.controller.js';

export default async (app) => {
    app.post('/api/v1/register', userController.registerUser);
    app.post('/api/v1/login', userController.loginUser);
    app.delete('/api/v1/user/:username', userController.deleteUser);
}
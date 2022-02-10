import { Router } from 'express';
const router = Router();
import { registerUser, loginUser } from '../controller/authController.js'
import auth from '../middleware/authMiddleware.js';
import User from '../model/authModel.js';


router
.route('/register')
.post(registerUser)


router
.route('/login')
.post(loginUser)


/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user', auth, async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");
        if (!user) throw Error('User does not exist');
        res.json(user);
        
    } catch (e) {
        res.status(400).json({
            msg: e.message
        })
    }
})

export default router;
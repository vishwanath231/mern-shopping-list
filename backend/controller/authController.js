import User from '../model/authModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';


/**
 * 
 * @router POST api/auth/register 
 * @desc   Create a new user
 * @access Public
 */

const registerUser = async (req, res) => {

    const { name, email, password, password2 } = req.body;

    try {
       
        if (!name || !email || !password || !password2) throw Error("please all fields required!");
        if (password.length < 6) throw Error("Password should be at least 6 characters!");
        if (!/[A-Z]/.test(password)) throw Error("Password must contain at least one uppercase character!");
        if (!/[0-9]/.test(password)) throw Error("Password must contain at least one digit!");
        if (password !== password2) throw Error("Password doesn't match");


        const user = await User.findOne({email: email });
        if (user) throw Error("User already exist!");

        const salt = await bcrypt.genSalt(10)
        if (!salt) throw Error("Something went wrong with bcrypt");

        const hash = await bcrypt.hash(password, salt)
        if (!hash) throw Error("Something went wrong with hashing password");

        const newUser = new User({
            name,
            email,
            password: hash
        });

        const savedUser = await newUser.save();
        if (!savedUser) throw Error('Something went wrong saving the user');

        return res.status(200).json({
            msg: "Registration Successfull!",
            token: generateToken(savedUser._id),
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
              }
        })

    } catch (e) {
        
        return res.status(400).json({
            msg: e.message
        })
    }
}



/**
 * 
 * @router GET api/auth/login
 * @desc   Get a user
 * @access Public
 */


const loginUser = async (req, res) => {

    const { email, password } = req.body;
    
    try {

        if (!email || !password) throw Error("please all fields required!");

        const user = await User.findOne({ email: email });
        if (!user) throw Error("User does not exist!");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw Error("Invalid credentials!");


        return res.status(200).json({
            msg: "Login Successfull!",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
        
    } catch (err) {
        
        return res.status(400).json({
            msg: err.message
        })
    }
}


export { registerUser , loginUser };
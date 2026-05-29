import express from "express";
import Auth from "../schema/AuthSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/sign-in', async (req, res) => {
    try {
        const { UserName, Password } = req.body;

        if (!UserName || !Password) {
            return res.status(400).json({ message: 'Fill out missing fields' });
        }

        const isUserNameExist = await Auth.findOne({ UserName });

        if (isUserNameExist) {
            return res.status(403).json({
                message: 'User name already taken'
            });
        }


        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(Password, salt);

        const newUser = await Auth.create({ UserName, Password: hashedPassword });

        return res.status(201).json({ message: 'New user created successfully' , user: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
  try {
         const { UserName, Password } = req.body;

        if (!UserName || !Password) {
            return res.status(400).json({ message: 'Fill out missing fields' });
        }

        const isUserNameExist = await Auth.findOne({ UserName });

        if (!isUserNameExist) {
            return res.status(403).json({
                message: 'Invalid User name'
            });
        }


        const hashedPassword = isUserNameExist.Password;

        const isPasswordCorrect = await bcrypt.compare(Password, hashedPassword);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Password incorrect'});
        }

        req.session.users = {
            _id: isUserNameExist._id,
            username: isUserNameExist.UserName
        }


        return res.status(200).json({ message: 'Logged in successfully', user: req.session.users });
  }   catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/logout', async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Field to login' });
            }

            return res.status(200).json({ message: 'Logged in successfully' });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Intenal server error' });
    }
});

export default router;
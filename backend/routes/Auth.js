import express from "express";
import Auth from "../schema/AuthSchema.js";
import bcrypt from "bcrypt";
import { useState } from "react";

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


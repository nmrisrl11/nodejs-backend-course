import bcrypt from "bcrypt";
import { prisma } from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (userExists) {
            return res.status(400).json({
                error: "Usesr already exists with this email"
            })
        }

        //! Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //! Register User
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        const token = generateToken(user.id);

        res.status(201).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    name: name,
                    email: email
                },
                token
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", 
            error: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password"
            })
        }

        //! Verify Password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid email or password"
            })
        }

        const token = generateToken(user.id);

        res.status(200).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    email: email
                },
                token
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error", 
            error: error.message
        })
    }
}

export { login, register };


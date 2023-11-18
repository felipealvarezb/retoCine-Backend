import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.__t // El tipo de usuario (Subscriber o cualquier otro)
        },
        process.env.JWT_SECRET, 
        {
            expiresIn: '1h' 
        }
    );
};

export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ success: false, message: 'Acceso no autorizado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Token inválido' });
        }

        req.user = user;
        next();
    });
};

export const comparePassword = async (enteredPassword, storedPassword) => {
    try{
        return await bcrypt.compare(enteredPassword, storedPassword);
    }catch (error) {
        console.error('Error comparando contraseñas:', error);
    }
};

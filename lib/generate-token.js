import jwt from 'jsonwebtoken';

export default function generateToken(payload) {
    const options = {
        expiresIn: '5m'
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
    return token;
}
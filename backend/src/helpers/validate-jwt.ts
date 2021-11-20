import jwt from 'jsonwebtoken';

const ValidateJWT = (token: string) => {
    return jwt.verify(token, process.env.PRIVATE_KEY);
}

export default ValidateJWT;
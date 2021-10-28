import jwt from 'jsonwebtoken';

const GenerateJWT = (username: string) => {
    return new Promise<string>((resolve, reject) => {
        jwt.sign({ username }, process.env.PIRVATE_KEY, { expiresIn: '24h' }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    })
}

export default GenerateJWT;
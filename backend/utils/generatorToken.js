import jwt from 'jsonwebtoken'

export const jwtToken = (userdId) => {
    return jwt.sign({id: userdId}, process.env.JWT_SECRET, {expiresIn: '7d'})
}
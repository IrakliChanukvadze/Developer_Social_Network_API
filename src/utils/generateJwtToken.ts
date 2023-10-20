// jwtUtils.js
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

type TUser = {
  id: number;
  email: string;
};

export async function generateJwtToken(user: TUser) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const options = {
    expiresIn: '30d',
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

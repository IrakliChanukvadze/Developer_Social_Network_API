import bcrypt from 'bcrypt';

async function comparePasswords(
  plaintextPassword: string,
  hashedPassword: string,
) {
  const match = await bcrypt.compare(plaintextPassword, hashedPassword);
  return match;
}

export default comparePasswords;

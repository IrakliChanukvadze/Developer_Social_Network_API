import bcrypt from 'bcrypt';

async function comparePasswords(
  plaintextPassword: string,
  hashedPassword: string,
) {
  try {
    const match = await bcrypt.compare(plaintextPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
}

export default comparePasswords;

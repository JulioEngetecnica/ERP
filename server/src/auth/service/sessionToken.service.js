import crypto from 'crypto';
import db from '#models';

class SessionTokenService {

  static generate() {
    return crypto.randomBytes(32).toString('hex');
  }

  static async create(userId) {
    const token = this.generate();

    await db.Usuario.update(
      { token },
      { where: { id: userId } }
    );

    return token;
  }

  static async validate(userId, token) {
    const user = await db.Usuario.findOne({
      where: { id: userId, token }
    });

    return !!user;
  }

  static async revoke(userId) {
    await db.Usuario.update(
      { token: null },
      { where: { id: userId } }
    );
  }
}

export default SessionTokenService;

import { magic } from '../../lib/magicAdmin';
import jwt from 'jsonwebtoken';
import { setTokenCookie } from '../../lib/cookies';

export default async function user(req, res) {
    try {
      const didToken = req.headers.authorization.substr(7);
  
      await magic.token.validate(didToken);
  
      const metadata = await magic.users.getMetadataByToken(didToken);
  
      // Create JWT with information about the user, expires in `SESSION_LENGTH_IN_DAYS`, and signed by `JWT_SECRET`
      let token = jwt.sign(
        {
          ...metadata,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * process.env.SESSION_LENGTH_IN_DAYS,
        },
        process.env.JWT_SECRET,
      );
  
      // Set a cookie containing the JWT
      setTokenCookie(res, token);
  
      res.status(200).send({ user: metadata });
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  }
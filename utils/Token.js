const jwt = require('jsonwebtoken');

class Token {
   static verify(token) {
      return jwt.verify(token, process.env.SECRET_KEY);
   }

   static decode(bearer) {
      if (bearer) {
         let array = bearer.split(` `);
         let token = array[1];
         return this.verify(token);
      } else {
         throw new Error(`No token to decode`);
      }
   }

   static createToken(objectToSign) {
      return jwt.sign(objectToSign, process.env.SECRET_KEY);
   }

}

module.exports = Token;
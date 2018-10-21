// const crypto = require('crypto');

// /* generates salt for hash with random char string */
// const genRandomString = function genRandomString(length) {
//   return crypto.randomBytes(Math.ceil(length / 2))
//     .toString('hex')
//     .slice(0, length);
// };

// /* hash password with sha512 */
// const sha512 = function sha512(password, salt) {
//   const hash = crypto.createHmac('sha512', salt);
//   hash.update(password);
//   const value = hash.digest('hex');
//   return {
//     salt,
//     passwordHash: value,
//   };
// };

// function hashPassword(password) {
//   const salt = genRandomString(16);
//   const passwordData = sha512(password, salt);

//   return passwordData;
// }



// module.exports = hashPassword;

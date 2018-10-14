const bcrypt = require('bcryptjs');

var password = "12345";

var user = "$2a$10$NmehvPHepfGy3Vm/kbTlb.VNK2gXHHyS6QaO7SNosaoNuSRnsEtMy"

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
})

// bcrypt.compare(password, user, (err, res) => {
//   console.log(res);
//
// })



//
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(user.password, salt, (err, hash) => {
//     user.password = hash;
//     console.log(`Hashed password`);
//     next();
//   });
// });

const db = require('./config');

const getUserByWalletAddress = (walletAddress) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE walletAddress = ?';
    db.query(sql, [walletAddress], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

const createUser = (walletAddress, userName, email) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO user (walletAddress, userName, email, created_at) VALUES (?, ?, ?, NOW())';
    db.query(sql, [walletAddress, userName, email], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE userId = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

const saveImage = (userId, filename, filepath) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO image (userId, filename, filepath, uploaded_at) VALUES (?, ?, ?, NOW())';
    db.query(sql, [userId, filename, filepath], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const checkIfImageExists = (userId, filename) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM image WHERE userId = ? AND filename = ?';
    db.query(sql, [userId, filename], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.length > 0);
    });
  });
};

module.exports = { getUserByWalletAddress, createUser, getUserById, saveImage, checkIfImageExists };

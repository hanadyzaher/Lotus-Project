const db = require('./config');
// Function to get menu items by menu ID using a promise
const getMenuByMenuId = (menuId) => {
    const sql = 'SELECT * FROM menujson WHERE menuId = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [menuId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  };
  
  module.exports = { getMenuByMenuId };

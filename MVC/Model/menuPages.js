const db = require('./config');

// Function to get menu items for a specific page ID
const getMenuItemsByPageId = (pageId) => {
    const sql = 'SELECT * FROM pagemenu WHERE pageId = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [pageId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  };
  
  module.exports = { getMenuItemsByPageId };

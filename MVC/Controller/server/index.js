const express = require('express');  // Import the express library to create a server
const cors = require('cors');  // Import the cors library to handle Cross-Origin Resource Sharing (CORS)
const app = express();  // Create an express application
const port = 3001;  // Define the port number for the server
const mydb = require('../../Model/config');
app.use(cors());  // Use cors to allow cross-origin requests
const pageModel = require('../../Model/pageModel');
const formModel = require('../../Model/formsModel');
const inputModel = require('../../Model/inputsModel');
const menuModel = require('../../Model/menuModel');
const pageMenuModel = require('../../Model/menuPages');
const userModel = require('../../Model/userModel');
const multer = require('multer');
const path = require('path');


require('dotenv').config(); // For loading environment variables from a .env file
app.use(express.json()); // Ensure this middleware is applied

app.post('/data/:pageId', async (req, res) => {
  try {
    const pageId = req.params.pageId;
    const page = await pageModel.getPageById(pageId);
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    let form = null;
    if (page.formId) {
      form = await formModel.getFormById(page.formId);
      if (form) {
        form.inputs = await inputModel.getInputsByFormId(page.formId);
      }
    }

    const pageMenus = await pageMenuModel.getMenuItemsByPageId(pageId);
    const menus = {};
    for (const pageMenu of pageMenus) {
      if (!menus[pageMenu.menuType]) {
        menus[pageMenu.menuType] = [];
      }
      const menuItems = await menuModel.getMenuByMenuId(pageMenu.menuItemId);
      menus[pageMenu.menuType].push(...menuItems);
    }

    res.json({ page, form, menus });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Endpoint to fetch data for a specific page (for Home component)
app.post('/pages/:pageId', async (req, res) => {
  try {
    const page = await pageModel.getPageById(req.params.pageId);
    if (page) {
      res.json(page);
    } else {
      res.status(404).json({ error: 'Page not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Endpoint to fetch menu items by menu ID
app.post('/menu/:menuId', async (req, res) => {
  try {
    const menuItems = await menuModel.getMenuByMenuId(req.params.menuId);
    if (menuItems.length > 0) {
      res.json(menuItems);
    } else {
      res.status(404).json({ error: 'Menu not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Check if user exists
app.post('/users/check', async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const user = await userModel.getUserByWalletAddress(walletAddress);
    if (user) {
      res.json({ exists: true, user });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.error('Database error:', err.message); 
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { walletAddress, userName, email } = req.body;
    console.log('Received user data:', req.body);
    await userModel.createUser(walletAddress, userName, email);
    res.json({ success: true });
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save file with its original name
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  const { userId, imageUrl } = req.body;

  if (!req.file && !imageUrl) {
    return res.status(400).send('No file uploaded.');
  }

  const filename = req.file ? req.file.originalname : path.basename(imageUrl);
  const filepath = req.file ? req.file.path : imageUrl;

  try {
    const user = await userModel.getUserById(userId); // Ensure user exists
    if (!user) {
      return res.status(400).send('Invalid user ID');
    }

    const fileExists = await userModel.checkIfImageExists(userId, filename);
    if (fileExists) {
      return res.status(400).send('File with the same name already exists. Please rename your file and try again.');
    }

    await userModel.saveImage(userId, filename, filepath);
    res.send(`File uploaded successfully: ${filename}`);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});



// Start the server and listen on port 3001
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

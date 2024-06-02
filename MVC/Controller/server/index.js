const express = require('express');  // Import the express library to create a server
const cors = require('cors');  // Import the cors library to handle Cross-Origin Resource Sharing (CORS)
const app = express();  // Create an express application
const port = 3001;  // Define the port number for the server

app.use(cors());  // Use cors to allow cross-origin requests

const pagesData = require('./pages.json');  // Import pages data
const formsData = require('./forms.json');  // Import forms data
const menusData = require('./menu.json');  // Import menus data

// Endpoint to fetch combined data for a specific page
app.post('/data/:pageId', (req, res) => {
  const pageId = req.params.pageId;  // Get the pageId from the request parameters
  const page = pagesData.pages.find((page) => page.pageId === pageId);  // Find the page by pageId
  if (page) {
    // Find the associated form using formId (if it exists)
    const form = formsData.forms.find((form) => form.formId === page.formId);
      res.json({ page, form });
  
  } else {
    res.status(404).json({ error: 'Page not found' });  // If the page is not found, return a 404 error
  }
});

// Endpoint to fetch data for a specific page (for Home component)
app.post('/pages/:pageId', (req, res) => {
  const pageId = req.params.pageId;  // Get the pageId from the request parameters
  const page = pagesData.pages.find((page) => page.pageId === pageId);  // Find the page by pageId
  if (page) {
    res.json(page);  // Return page data as a JSON object
  } else {
    res.status(404).json({ error: 'Page not found' });  // If the page is not found, return a 404 error
  }
});


app.post('/menu/:menuId', (req, res) => {
      const menuId = req.params.menuId;  // קבלת ה-menuId מהנתיב
      const menuItems = menusData.menu.filter((item) => item.menuId === menuId);  // מציאת כל הפריטים המתאימים לפי menuId
      if (menuItems.length > 0) {
        res.json(menuItems);  // אם נמצאו פריטים מתאימים, מחזירים אותם כ-JSON
      } else {
        res.status(404).json({ error: 'Menu not found' });  // אם לא נמצאו פריטים, מחזירים שגיאה 404
      }
   
});

// Start the server and listen on port 3001
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

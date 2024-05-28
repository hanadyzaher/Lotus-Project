const express = require('express');  // ייבוא הספרייה express ליצירת שרת
const path = require('path');  // ייבוא הספרייה path לעבודה עם נתיבים
const fs = require('fs');  // ייבוא הספרייה fs לעבודה עם קבצים
const cors = require('cors');  // ייבוא הספרייה cors לטיפול במדיניות מקור משותף (CORS)
const app = express();  // יצירת אפליקציית express
const port = 3001;  // הגדרת מספר הפורט שעליו השרת יפעל

app.use(cors());  // שימוש ב-cors כדי לאפשר בקשות בין שרתים 


// פונקציה לקרוא את קובץ ה-JSON ולהחזיר הבטחה (Promise)
const readJsonFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);  // אם יש שגיאה בקריאת הקובץ, הדחייה (reject) תטופל
      } else {
        resolve(JSON.parse(data));  // אם קריאת הקובץ מצליחה, הנתונים מנותחים ל-JSON ומוחזרים
      }
    });
  });
};

// הגדרת נתיב לטעינת המידע מה-JSON עבור דפי האתר
app.get('/pages/:pageId', (req, res) => {
  readJsonFile(path.join(__dirname, 'pages.json'))
    .then((pagesData) => {
      const pageId = req.params.pageId;  // המרת ה-pageId למספר שלם
      const page = pagesData.pages.find((page) => page.pageId === pageId);  // מציאת הדף המתאים לפי pageId
      if (page) {
        res.json(page);  // אם הדף נמצא, מחזירים אותו כ-JSON
      } else {
        res.status(404).json({ error: 'Page not found' });  // אם הדף לא נמצא, מחזירים שגיאה 404
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to read JSON file' });  // אם יש שגיאה בקריאת הקובץ, מחזירים שגיאה 500
    });
});

// הגדרת נתיב לטעינת המידע מה-JSON עבור טפסים באתר
app.get('/forms/:formId', (req, res) => {
  readJsonFile(path.join(__dirname, 'forms.json'))
    .then((formsData) => {
      const formId = req.params.formId;  
      const form = formsData.forms.find((form) => form.formId === formId);  // מציאת הטופס המתאים לפי formId
      if (form) {
        res.json(form);  // אם הטופס נמצא, מחזירים אותו כ-JSON
      } else {
        res.status(404).json({ error: 'Form not found' });  // אם הטופס לא נמצא, מחזירים שגיאה 404
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to read JSON file' });  // אם יש שגיאה בקריאת הקובץ, מחזירים שגיאה 500
    });
});

// נתיב לטיפול בתפריט
app.get('/menu/:menuId', (req, res) => {
  readJsonFile(path.join(__dirname, 'menu.json'))
    .then((menuData) => {
      const menuId = req.params.menuId;  // קבלת ה-menuId מהנתיב
      const menuItems = menuData.menu.filter((item) => item.menuId === menuId);  // מציאת כל הפריטים המתאימים לפי menuId
      if (menuItems.length > 0) {
        res.json(menuItems);  // אם נמצאו פריטים מתאימים, מחזירים אותם כ-JSON
      } else {
        res.status(404).json({ error: 'Menu not found' });  // אם לא נמצאו פריטים, מחזירים שגיאה 404
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to read JSON file' });  // אם יש שגיאה בקריאת הקובץ, מחזירים שגיאה 500
    });
});


// התחלת השרת והאזנה לפורט 3001
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const multer = require('multer');
const ExcelJS = require('exceljs');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const port = 3000;

// Set up Multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('excelFile'), async (req, res) => {
  try {
    // Ensure that a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Convert Excel data to JSON
    const jsonData = await convertExcelToJson(req.file.buffer);

    // Do something with the JSON data, for example, send it as a response
    res.json(jsonData);
  } catch (error) {
    console.error('Error processing Excel file:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function convertExcelToJson(fileBuffer) {
  const workbook = new ExcelJS.Workbook();

  try {
    // Load the Excel file from the buffer
    await workbook.xlsx.load(fileBuffer);

    const result = [];

    workbook.eachSheet((sheet, sheetId) => {
      const sheetData = [];
      sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        // Convert each row to JSON
        const rowData = {};
        row.eachCell((cell, colNumber) => {
          rowData[`column${colNumber}`] = cell.value;
        });
        sheetData.push(rowData);
      });

      // Add sheet data to result array
      result.push({ sheetName: sheet.name, data: sheetData });
    });

    return result;
  } catch (error) {
    console.error('Error reading Excel file:', error.message);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});

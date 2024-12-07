import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const SPREADSHEET_ID = '1RB9Jw843HKk59zx80_L2kj6Pnps8agSDzY02Xevt-ZM';
const RANGE = 'A2:B5';

let lmeHistoryCache = [];

async function fetchAndUpdateLMEPrices() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows) {
      throw new Error('No data found');
    }

    lmeHistoryCache = rows.map(row => ({
      date: String(row[0]),
      price: Number(row[1])
    }));

    console.log('LME prices updated successfully');
  } catch (error) {
    console.error('Error updating LME prices:', error);
  }
}

// Schedule updates at 10 AM IST
cron.schedule('0 10 * * *', fetchAndUpdateLMEPrices, {
  timezone: 'Asia/Kolkata'
});

app.get('/api/lme-history', (req, res) => {
  res.json(lmeHistoryCache);
});

// Initial fetch
fetchAndUpdateLMEPrices();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import { google } from 'googleapis';

const SPREADSHEET_ID = '1RB9Jw843HKk59zx80_L2kj6Pnps8agSDzY02Xevt-ZM';
const RANGE = 'A2:B5';

export interface LMEHistoryData {
  date: string;
  price: number;
}

export async function fetchLMEHistory(): Promise<LMEHistoryData[]> {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      throw new Error('No data found in spreadsheet');
    }

    return rows.map(row => ({
      date: row[0],
      price: parseFloat(row[1]),
    }));
  } catch (error) {
    console.error('Error fetching LME history:', error);
    throw error;
  }
}
import axios from 'axios';
import { load } from 'cheerio';

interface MCXPrice {
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  dayHigh: number;
  dayLow: number;
  lastUpdated: string;
}

export async function scrapeMCXAluminiumPrice(expiryDate: string): Promise<MCXPrice> {
  try {
    const url = `https://www.moneycontrol.com/commodity/mcx-aluminium-price?type=futures&exp=${expiryDate}`;
    const response = await axios.get(url);
    const $ = load(response.data);

    // Get the main price element (237.20 in the example)
    const priceText = $('.commodity_overview .price').first().text().trim();
    const currentPrice = parseFloat(priceText.replace(/,/g, ''));

    // Get the change values
    const changeText = $('.commodity_overview .change_value').first().text().trim();
    const changePercentText = $('.commodity_overview .change_percent').first().text().trim();
    const change = parseFloat(changeText.replace(/,/g, ''));
    const changePercent = parseFloat(changePercentText.replace(/[()%]/g, ''));

    // Get volume
    const volumeText = $('.commodity_overview .volume_value').first().text().trim();
    const volume = parseInt(volumeText.replace(/,/g, ''), 10);

    // Get day's range
    const dayRangeText = $('.commodity_overview .day_range_value').first().text().trim();
    const [lowStr, highStr] = dayRangeText.split('-').map(s => s.trim());
    const dayLow = parseFloat(lowStr.replace(/,/g, ''));
    const dayHigh = parseFloat(highStr.replace(/,/g, ''));

    return {
      currentPrice,
      change,
      changePercent,
      volume,
      dayHigh,
      dayLow,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error scraping MCX price:', error);
    throw new Error('Failed to fetch MCX price data');
  }
}
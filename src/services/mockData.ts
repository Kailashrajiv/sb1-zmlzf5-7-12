export const mockLMEHistory = [
  {
    date: "27 Nov 2024",
    price: 2577.00,
    change: -0.52
  },
  {
    date: "26 Nov 2024",
    price: 2590.50,
    change: -0.98
  },
  {
    date: "25 Nov 2024",
    price: 2616.00,
    change: 1.04
  },
  {
    date: "22 Nov 2024",
    price: 2589.00,
    change: -0.85
  }
].map(item => ({
  date: String(item.date),
  price: Number(item.price),
  change: Number(item.change)
}));
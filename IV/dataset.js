const fs = require('fs');
const csv = require('csv-parser');

// Function to calculate the Black-Scholes call option price
function blackScholesCallPrice(S, K, r, T, sigma) {
  const d1 = (Math.log(S / K) + (r + (sigma ** 2) / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  const callPrice = S * Math.exp(-r * T) * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2);
  return callPrice;
}

// Function to calculate the implied volatility
function calculateImpliedVolatility(callPrice, S, K, r, T) {
  const impliedVolatility = optimizeNewton(sigma => blackScholesCallPrice(S, K, r, T, sigma) - callPrice, 0.5);
  return impliedVolatility;
}

// Function to calculate time to maturity (TTM) in years
function calculateTimeToMaturity(expiryDate) {
  const currentDate = new Date();
  const timeToExpiry = (expiryDate - currentDate) / (1000 * 60 * 60 * 24 * 365);
  return Math.max(timeToExpiry, 0); // Set TTM to 0 if the expiry date has passed
}

// Read the CSV file
fs.createReadStream('dataset.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Extract the necessary values from each row
    const callPrice = parseFloat(row.callPrice);
    const underlyingPrice = parseFloat(row.underlyingPrice);
    const strikePrice = parseFloat(row.strikePrice);
    const riskFreeRate = 0.05; // Assuming a fixed risk-free interest rate of 5%
    const expiryDate = new Date(row.expiryDate);

    // Calculate time to maturity (TTM)
    const timeToMaturity = calculateTimeToMaturity(expiryDate);

    // Calculate implied volatility
    const impliedVolatility = calculateImpliedVolatility(callPrice, underlyingPrice, strikePrice, riskFreeRate, timeToMaturity);

    // Display the result
    console.log('Call Price:', callPrice);
    console.log('Underlying Price:', underlyingPrice);
    console.log('Strike Price:', strikePrice);
    console.log('Risk-Free Rate:', riskFreeRate);
    console.log('Expiry Date:', expiryDate);
    console.log('Implied Volatility:', impliedVolatility);
    console.log('-----------------------');
  })
  .on('end', () => {
    console.log('CSV file processing completed.');
  });

// Function to calculate the cumulative distribution function (CDF) of the standard normal distribution
function normCDF(x) {
  return (1 + erf(x / Math.sqrt(2))) / 2;
}

// Function to calculate the error function (erf)
function erf(x) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = (x >= 0) ? 1 : -1;
  const absX = Math.abs(x);

  const t = 1.0 / (1.0 + p

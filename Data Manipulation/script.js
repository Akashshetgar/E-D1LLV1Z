function erf(x) {
  // Constants
  var a1 =  0.254829592;
  var a2 = -0.284496736;
  var a3 =  1.421413741;
  var a4 = -1.453152027;
  var a5 =  1.061405429;
  var p  =  0.3275911;

  // Save the sign of x
  var sign = (x >= 0) ? 1 : -1;
  x = Math.abs(x);

  // Approximation polynomial for erf(x)
  var t = 1.0 / (1.0 + p * x);
  var y = (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t;

  // Calculate the result
  var result = 1 - y * Math.exp(-x * x);
  return sign * result;
}

function norm_cdf(x) {
  return (1 + erf(x / Math.sqrt(2))) / 2;
}

function black_scholes(S, X, r, T, sigma) {
  var d1 = (Math.log(S / X) + (r + (sigma ** 2) / 2) * T) / (sigma * Math.sqrt(T));
  var d2 = d1 - sigma * Math.sqrt(T);
  var N_d1 = norm_cdf(d1);
  var N_d2 = norm_cdf(d2);
  var call_price = S * N_d1 - X * Math.exp(-r * T) * N_d2;
  return call_price;
}

function calculate_iv(market_data) {
  var LTP = market_data['LTP'];
  var X = parseInt(market_data['symbol'].match(/(\d{2}[A-Z]+\d{2})(\d+)/)[2]); // Extract strike price from the symbol
  console.log(X);
  var r = 0.05; // Risk-free interest rate as 5% (0.05)

  var expiration_date_str = market_data['symbol'].match(/(\d{2}[A-Z]+\d{2})/)[1]; // Extract the expiration date from the symbol
  console.log(expiration_date_str);
  var expiration_date = new Date(expiration_date_str.replace(/(\d{2})([A-Z]+)(\d{2})/, '$1 $2 $3')); // Parse expiration date
  var timestamp = new Date(market_data['timestamp'].replace('IST', ''));
  var expiration_datetime = new Date(expiration_date.getFullYear(), expiration_date.getMonth(), expiration_date.getDate(), 15, 30);
  var TTM = (expiration_datetime - timestamp) / (60 * 60 * 24 * 1000 * 365); // Time to maturity in years
  console.log(TTM);

  if (TTM < 0) {
    TTM = 0; // If the contract has expired, set TTM to a negative value
  }

  var IV = 0; // Initialize implied volatility

  function calculate_price_diff(sigma) {
    var theoretical_price = black_scholes(LTP, X, r, TTM, sigma);
    return theoretical_price - LTP;
  }

  var lower_volatility = 0; // Set the initial lower and upper bounds for volatility
  var upper_volatility = 10;
  var max_iterations = 100; // Set the maximum number of iterations and tolerance level
  var tolerance = 0.0001;

  for (var i = 0; i < max_iterations; i++) {
    var mid_volatility = (lower_volatility + upper_volatility) / 2; // Calculate the middle volatility
    var price_diff = calculate_price_diff(mid_volatility); // Calculate the price difference using the middle volatility

    if (Math.abs(price_diff) < tolerance) {
      IV = mid_volatility;
      break;
    }

    if (price_diff < 0) {
      lower_volatility = mid_volatility; // Update the bounds for volatility
    } else {
      upper_volatility = mid_volatility;
    }
  }

  return IV;
}

var market_data = {
  'symbol': 'ALLBANKS27JUL2345200CE',
  'LTP': 74425,
  'LTQ': 0,
  'totalTradedVolume': 0,
  'bestBid': 75045,
  'bestAsk': 77005,
  'bestBidQty': 40,
  'bestAskQty': 2240,
  'openInterest': 0,
  'timestamp': 'Sat Jul 01 16:33:10 IST 2023',
  'sequence': 7590,
  'prevClosePrice': 9960,
  'prevOpenInterest': 9960
};

var implied_volatility = calculate_iv(market_data);
console.log("Implied Volatility: " + implied_volatility);

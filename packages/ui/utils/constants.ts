export const baseUrl = `https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod`;
// airport urls
export const airPortUrl = `${baseUrl}/air/airports`;
export const airMarketRateUrl = `${baseUrl}/air/rates`;
// ocean urls
export const oceanPortUrl = `${baseUrl}/ocean/ports`;
export const oceanMarketRateUrl = `${baseUrl}/ocean/rates`;

// months for formatting the date
export const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const keysToCheck = ["mean", "low", "high"];

export const colorBlindOptions = {
  blue: "#1f77b4",
  orange: "#ff7f0e",
  green: "#2ca02c",
};

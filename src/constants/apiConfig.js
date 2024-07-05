// config/apiConfig.js
const BASE_URL = "http://qa.irix.in:5858/OlioSwitch";

const API_URLS = {
  LOGIN: `${BASE_URL}/passbook/login`,
  OTP_VERIFICATION: `${BASE_URL}/passbook/login/otpVerification`,
  PASSBOOK_PRINTER: `${BASE_URL}/PassbookPrinter`,
};

export default API_URLS;

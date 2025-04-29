import { KiteConnect } from "kiteconnect";

const apiKey = "tr6u5rpzrarom1gd";

// it is used verify or generate the accesToken
const apiSecret = "vuhv3obi7wkpznoowwltbtkdalmlp847";

// one time token 
// requestToken keeps getting changed again and again so we need access Token to place orders 
const requestToken = "CS3kWVlb4lN8EBMUfqPk6CEWCg0mNuim";

let accesToken = "xCy9TS2PTGV5QFB7I0lzWFcjcH97tlMt";

const kc = new KiteConnect({ api_key: apiKey });

// creates a url , when we will authorize them , they will send us back requestToken 
console.log(kc.getLoginURL());

async function init() {
  try {
    await generateSession();
    await getProfile();
  } catch (err) {
    console.error(err);
  }
}

// generate a requestToken first then change requestToken variable then run bun accesTokenGen.ts again to get accesToken 

async function generateSession() {
  try {
    const response = await kc.generateSession(requestToken, apiSecret);
    console.log(response.access_token);
    
    kc.setAccessToken(response.access_token);
    console.log("Session generated:", response);
  } catch (err) {
    console.error("Error generating session:", err);
  }
}

async function getProfile() {
  try {
    const profile = await kc.placeOrder("regular",{
      exchange: "NSE",
      tradingsymbol: "HDFCBANK",
      transaction_type: "BUY",
      quantity: 1,
      product: "CNC",
      order_type: "MARKET"
    });
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}
// Initialize the API calls
init();
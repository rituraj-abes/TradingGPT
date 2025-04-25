import { KiteConnect } from "kiteconnect";

const apiKey = "tr6u5rpzrarom1gd";

// it is used verify or generate the accesToken 
const apiSecret = "vuhv3obi7wkpznoowwltbtkdalmlp847";
// const requestToken = "sE25I0TpRlxz9OnYFR9QdAG7kdqnohsF";
// requestToken keeps getting changed again and again so we need access Token to place orders 

let accesToken = "Qljeluhd0LvWj5TQt5eAPNkzZ7bcntwP";

const kc = new KiteConnect({ api_key: apiKey });
// console.log(kc.getLoginURL());

// set the accesToken for all the future request I am sending 
kc.setAccessToken(accesToken);

export async function placeOrder(tradingsymbol:string , quantity: number , type: "BUY" | "SELL") {
  try {
    // this is the request I am sending to place the order
    await kc.placeOrder("regular",{
        exchange: "NSE",
        tradingsymbol: tradingsymbol,
        transaction_type: type,
        quantity: quantity,
        product: "CNC",
        order_type: "MARKET"
    });

    // await generateSession();
    // await getProfile();
  } catch (err) {
    console.error(err);
  }
}

export async function getPositions(){
  kc.setAccessToken(accesToken);
  const holdings = await kc.getPositions();
  let allHoldings = "";
  holdings.net.map(holdings => {
    allHoldings += `stock: ${holdings.tradingsymbol} , qty: ${holdings.quantity} , currentPrice: ${holdings.last_price} `
  })
  return allHoldings;
}

// async function generateSession() {
//   try {
//     // const response = await kc.generateSession(requestToken, apiSecret);
//     // console.log(response.access_token);
    
//     // kc.setAccessToken(response.access_token);
//     // console.log("Session generated:", response);
//   } catch (err) {
//     console.error("Error generating session:", err);
//   }
// }

// async function getProfile() {
//   try {
//     // const profile = await kc.placeOrder("regular",{
//     //     exchange: "NSE",
//     //     tradingsymbol: "HDFCBANK",
//     //     transaction_type: "BUY",
//     //     quantity: 1,
//     //     product: "CNC",
//     //     order_type: "MARKET"
//     // });
//     // const profile = await kc.getProfile();
//     console.log("Profile:", profile);
//   } catch (err) {
//     console.error("Error getting profile:", err);
//   }
// }
// Initialize the API calls

// init();
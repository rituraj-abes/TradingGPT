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

  } catch (err) {
    console.error(err);
  }
}

export async function getPositions(){
  // kc.setAccessToken(accesToken);
  const holdings = await kc.getPositions();
  let allHoldings = "";
  holdings.net.map(holding => {
    allHoldings += `stock: ${holding.tradingsymbol} , qty: ${holding.quantity} , currentPrice: ${holding.last_price} `;
  })
  return allHoldings;
}
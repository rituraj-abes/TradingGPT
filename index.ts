import { getPositions, placeOrder } from "./trade";

placeOrder("ITC" , 1 , "BUY")


import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Add an addition tool
server.tool("add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

server.tool("buy-stock" , "Buys the stock on zerodha exchange for the user. It executes a real order for the user on the exchange.",
    {
        stock: z.string() , qty: z.number()
    },
    async ({ stock , qty }) => {
        placeOrder(stock , qty , "BUY");
        return {
            content: [{ type: "text" , text: "Stock has been bought"}]
        }
    }
)

server.tool("sell-stock" , "Sells the stock on zerodha exchange for the user. It executes a real order for the user on the exchange.",
    {
        stock: z.string() , qty: z.number()
    },
    async ({ stock , qty }) => {
        placeOrder(stock , qty , "SELL");
        return {
            content: [{ type: "text" , text: "Stock has been sold"}]
        }
    }
)

server.tool("show-portfolio" , "Shows my complete portfolio in Zerodha",
    {},
    async () => {
        const holdings = await getPositions();
        return {
            content: [{ type: "text" , text: holdings}]
        }
    }
)


// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);

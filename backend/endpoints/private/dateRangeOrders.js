const { SquareClient, SquareEnvironment } = require('square');
require('dotenv').config();

module.exports = {
    endpoint: 'ordersFromRange',
    route: 'post',
    async execute(req, res) {
        const timeRange = req.body.timeRange;
        console.log(timeRange);

        const client = new SquareClient({
            environment: SquareEnvironment.Production,
            token: process.env.SQR_PRODUCTION_TOKEN,
        });

        // Create a test order
        const testOrder = await client.orders.create({
            idempotencyKey: "323a48f2-680d-4325-a3a6-e5cbe622942c",
            order: {
                locationId: "LQ1KFWFDJYP44",
                ticketName: "testingOrder",
                state: "COMPLETED",
            },
        });

        console.log(testOrder);

        // Search for completed orders in the given time range
        const orders = await client.orders.search({
            returnEntries: true,
            limit: 3,
            locationIds: ["LQ1KFWFDJYP44"],
            query: {
                filter: {
                    dateTimeFilter: {
                        closedAt: timeRange,
                    },
                    stateFilter: {
                        states: ["COMPLETED"],
                    },
                },
                sort: {
                    sortField: "CLOSED_AT",
                    sortOrder: "DESC",
                },
            },
        });

        // Recursive function to convert BigInt to number
        function convertBigInt(obj) {
            if (typeof obj === 'bigint') {
                return Number(obj);
            } else if (Array.isArray(obj)) {
                return obj.map(convertBigInt);
            } else if (obj !== null && typeof obj === 'object') {
                return Object.fromEntries(
                    Object.entries(obj).map(([key, value]) => [key, convertBigInt(value)])
                );
            }
            return obj;
        }

        // Fetch detailed order data and process BigInt conversion
        const response = await Promise.all(
            orders.orderEntries.map(async order => {
                const orderId = order.orderId;
                const orderData = await client.orders.get({ orderId });

                return convertBigInt(orderData);
            })
        );

        return response;
        
    }
};

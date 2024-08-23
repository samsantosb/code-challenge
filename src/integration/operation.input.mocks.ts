interface Operation {
  operation: string;
  "unit-cost": number;
  quantity: number;
}

type OperationJSON = string;

/**
 * Generates a JSON string representing a sequence of operations where:
 * - The first operation is a purchase of 100 stocks at a unit cost of 10.00.
 * - The second operation is a sale of 50 stocks at a unit cost of 15.00.
 * - The third operation is a sale of 50 stocks at a unit cost of 15.00.
 *
 * Operations:
 * - buy: Buying stocks does not incur any tax.
 * - sell: Selling 50 stocks at 15.00 per unit, resulting in no tax since the total value is less than 20000.
 * - sell: Selling another 50 stocks at 15.00 per unit, again resulting in no tax since the total value is less than 20000.
 *
 * @returns {OperationJSON} A JSON string representing the operations.
 */
function generateCaseOneInput(): OperationJSON {
  const operations: Operation[] = [
    { operation: "buy", "unit-cost": 10.0, quantity: 100 },
    { operation: "sell", "unit-cost": 15.0, quantity: 50 },
    { operation: "sell", "unit-cost": 15.0, quantity: 50 },
  ];
  return JSON.stringify(operations);
}

/**
 * Generates a JSON string representing a sequence of operations where:
 * - The first operation is a purchase of 10000 stocks at a unit cost of 10.00.
 * - The second operation is a sale of 5000 stocks at a unit cost of 20.00.
 * - The third operation is a sale of 5000 stocks at a unit cost of 5.00.
 *
 * Operations:
 * - buy: Buying stocks does not incur any tax.
 * - sell: Selling 5000 stocks at 20.00 per unit, resulting in a taxable profit.
 * - sell: Selling 5000 stocks at 5.00 per unit, resulting in a loss.
 *
 * @returns {OperationJSON} A JSON string representing the operations.
 */
export function generateCaseTwoInput(): OperationJSON {
  const operations: Operation[] = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 20.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
  ];
  return JSON.stringify(operations);
}

/**
 * Generates a JSON string representing a sequence of operations where:
 * - The first operation is a purchase of 10000 stocks at a unit cost of 10.00.
 * - The second operation is a sale of 5000 stocks at a unit cost of 5.00.
 * - The third operation is a sale of 3000 stocks at a unit cost of 20.00.
 *
 * Operations:
 * - buy: Buying stocks does not incur any tax.
 * - sell: Selling 5000 stocks at 5.00 per unit, resulting in a loss.
 * - sell: Selling 3000 stocks at 20.00 per unit, resulting in a taxable profit after deducting the previous loss.
 *
 * @returns {OperationJSON} A JSON string representing the operations.
 */
export function generateCaseThreeInput(): OperationJSON {
  const operations: Operation[] = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 20.0, quantity: 3000 },
  ];
  return JSON.stringify(operations);
}

/**
 * Generates a JSON string representing a sequence of operations where:
 * - The first operation is a purchase of 10000 stocks at a unit cost of 10.00.
 * - The second operation is a purchase of 5000 stocks at a unit cost of 25.00.
 * - The third operation is a sale of 10000 stocks at a unit cost of 15.00.
 *
 * Operations:
 * - buy: Buying stocks does not incur any tax.
 * - buy: Buying more stocks does not incur any tax.
 * - sell: Selling 10000 stocks at 15.00 per unit, resulting in no profit or loss.
 *
 * @returns {OperationJSON} A JSON string representing the operations.
 */
export function generateCaseFourInput(): OperationJSON {
  const operations: Operation[] = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "buy", "unit-cost": 25.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 15.0, quantity: 10000 },
  ];
  return JSON.stringify(operations);
}

/**
 * Generates a JSON string representing a sequence of operations where:
 * - The first operation is a purchase of 10000 stocks at a unit cost of 10.00.
 * - The second operation is a purchase of 5000 stocks at a unit cost of 25.00.
 * - The third operation is a sale of 10000 stocks at a unit cost of 15.00.
 * - The fourth operation is a sale of 5000 stocks at a unit cost of 25.00.
 *
 * Operations:
 * - buy: Buying stocks does not incur any tax.
 * - buy: Buying more stocks does not incur any tax.
 * - sell: Selling 10000 stocks at 15.00 per unit, resulting in no profit or loss.
 * - sell: Selling 5000 stocks at 25.00 per unit, resulting in a taxable profit.
 *
 * @returns {OperationJSON} A JSON string representing the operations.
 */
export function generateCaseFiveInput(): OperationJSON {
  const operations: Operation[] = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "buy", "unit-cost": 25.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 15.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 25.0, quantity: 5000 },
  ];
  return JSON.stringify(operations);
}

/**
 * Generates a JSON string representing a sequence of operations where:
 * - The first operation is a purchase of 10000 stocks at a unit cost of 10.00.
 * - The second operation is a sale of 5000 stocks at a unit cost of 2.00.
 * - The third operation is a sale of 2000 stocks at a unit cost of 20.00.
 * - The fourth operation is a sale of 2000 stocks at a unit cost of 20.00.
 * - The fifth operation is a sale of 1000 stocks at a unit cost of 25.00.
 *
 * Operations:
 * - buy: Buying stocks does not incur any tax.
 * - sell: Selling 5000 stocks at 2.00 per unit, resulting in a loss.
 * - sell: Selling 2000 stocks at 20.00 per unit, resulting in no tax due to accumulated loss.
 * - sell: Selling another 2000 stocks at 20.00 per unit, resulting in no tax due to accumulated loss.
 * - sell: Selling 1000 stocks at 25.00 per unit, resulting in a taxable profit.
 *
 * @returns {OperationJSON} A JSON string representing the operations.
 */
export function generateCaseSixInput(): OperationJSON {
  const operations: Operation[] = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 2.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
    { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
    { operation: "sell", "unit-cost": 25.0, quantity: 1000 },
  ];
  return JSON.stringify(operations);
}

/**
 * Generates a JSON string representing a sequence of operations where:
 * - The first operation is a purchase of 10000 stocks at a unit cost of 10.00.
 * - The second operation is a sale of 5000 stocks at a unit cost of 2.00.
 * - The third operation is a sale of 2000 stocks at a unit cost of 20.00.
 * - The fourth operation is a sale of 2000 stocks at a unit cost of 20.00.
 * - The fifth operation is a sale of 1000 stocks at a unit cost of 25.00.
 * - The sixth operation is a purchase of 10000 stocks at a unit cost of 20.00.
 * - The seventh operation is a sale of 5000 stocks at a unit cost of 15.00.
 * - The eighth operation is a sale of 4350 stocks at a unit cost of 30.00.
 * - The ninth operation is a sale of 650 stocks at a unit cost of 30.00.
 *
 * Operations:
 * - buy: Buying stocks does not incur any tax.
 * - sell: Selling 5000 stocks at 2.00 per unit, resulting in a loss.
 * - sell: Selling 2000 stocks at 20.00 per unit, resulting in no tax due to accumulated loss.
 * - sell: Selling another 2000 stocks at 20.00 per unit, resulting in no tax due to accumulated loss.
 * - sell: Selling 1000 stocks at 25.00 per unit, resulting in a taxable profit.
 * - buy: Buying stocks does not incur any tax.
 * - sell: Selling 5000 stocks at 15.00 per unit, resulting in a loss.
 * - sell: Selling 4350 stocks at 30.00 per unit, resulting in a taxable profit.
 * - sell: Selling 650 stocks at 30.00 per unit, resulting in no tax due to total value being less than 20000.
 *
 * @returns {OperationJSON} A JSON string representing the operations.
 */
export function generateCaseSevenInput(): OperationJSON {
  const operations: Operation[] = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 2.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
    { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
    { operation: "sell", "unit-cost": 25.0, quantity: 1000 },
    { operation: "buy", "unit-cost": 20.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 15.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 30.0, quantity: 4350 },
    { operation: "sell", "unit-cost": 30.0, quantity: 650 },
  ];
  return JSON.stringify(operations);
}

/**
 * Generates a JSON string representing a sequence of operations where:
 * - The first operation is a purchase of 10000 stocks at a unit cost of 10.00.
 * - The second operation is a sale of 10000 stocks at a unit cost of 50.00.
 * - The third operation is a purchase of 10000 stocks at a unit cost of 20.00.
 * - The fourth operation is a sale of 10000 stocks at a unit cost of 50.00.
 *
 * Operations:
 * - buy: Buying stocks does not incur any tax.
 * - sell: Selling 10000 stocks at 50.00 per unit, resulting in a taxable profit.
 * - buy: Buying more stocks does not incur any tax.
 * - sell: Selling 10000 stocks at 50.00 per unit, resulting in a taxable profit.
 *
 * @returns {OperationJSON} A JSON string representing the operations.
 */
export function generateCaseEightInput(): OperationJSON {
  const operations: Operation[] = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 50.0, quantity: 10000 },
    { operation: "buy", "unit-cost": 20.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 50.0, quantity: 10000 },
  ];
  return JSON.stringify(operations);
}

export default {
  generateCaseOneInput,
  generateCaseTwoInput,
  generateCaseThreeInput,
  generateCaseFourInput,
  generateCaseFiveInput,
  generateCaseSixInput,
  generateCaseSevenInput,
  generateCaseEightInput,
};

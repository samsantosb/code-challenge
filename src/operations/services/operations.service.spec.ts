import {
  calculateTax,
  calculateTransactionOutcome,
  hasProfit,
  hasTax,
  processBuyOperation,
  processSellOperation,
  updateTransactionState,
  processLineOperations,
  createTransactionState,
} from "./operations.service";
import { Operation } from "../type-schemas/operation.types";
import { money, quantity } from "../../shared/enums/unit-measures.enum";
import { Tax } from "../type-schemas/tax.types";
import { formatMoney } from "../../shared/utility-services/utility-services";

describe("Transaction Utils", () => {
  describe("hasTax", () => {
    it("should return true if profit value is greater than the non-taxable limit", () => {
      const profitValueAboveLimit = 25000;
      expect(hasTax(profitValueAboveLimit)).toBe(true);
    });

    it("should return false if profit value is less than or equal to the non-taxable limit", () => {
      const profitValueAtLimit = 20000;
      const profitValueBelowLimit = 15000;
      expect(hasTax(profitValueAtLimit)).toBe(false);
      expect(hasTax(profitValueBelowLimit)).toBe(false);
    });
  });

  describe("hasProfit", () => {
    it("should return true if outcome is greater than 0", () => {
      const positiveOutcome = 100;
      expect(hasProfit(positiveOutcome)).toBe(true);
    });

    it("should return false if outcome is less than or equal to 0", () => {
      const zeroOutcome = 0;
      const negativeOutcome = -100;
      expect(hasProfit(zeroOutcome)).toBe(false);
      expect(hasProfit(negativeOutcome)).toBe(false);
    });
  });

  describe("calculateTax", () => {
    it("should calculate tax as 20% of profit value", () => {
      const profitValue = 1000;
      const expectedTax = formatMoney(profitValue * 0.2);
      expect(calculateTax(profitValue)).toBe(expectedTax);
    });
  });

  describe("calculateTransactionOutcome", () => {
    it("should calculate the outcome of a transaction", () => {
      const unitCost = 50;
      const weightedAverage = 40;
      const quantity = 10;
      const expectedOutcome = unitCost * quantity - weightedAverage * quantity;
      expect(
        calculateTransactionOutcome(unitCost, weightedAverage, quantity)
      ).toBe(expectedOutcome);
    });
  });

  describe("processBuyOperation", () => {
    it("should update transaction state correctly for a buy operation", () => {
      const transaction = createTransactionState();
      const operation: Operation = {
        type: "buy",
        unitCost: 10,
        quantity: 100,
      };

      processBuyOperation(transaction, operation, quantity.zero, money.zero);

      expect(transaction.get("stocksQuantity")).toBe(100);
      expect(transaction.get("stocksTotalValue")).toBe(1000);
      expect(transaction.get("stocksWeightedAverage")).toBe(10);
      expect(transaction.get("tax")).toBe(0);
    });
  });

  describe("processSellOperation", () => {
    it("should update transaction state correctly for a sell operation with profit less than 20000", () => {
      const transaction = createTransactionState();
      transaction.set("stocksQuantity", 100);
      transaction.set("stocksTotalValue", 1000);
      transaction.set("stocksWeightedAverage", 10);
      const operation: Operation = {
        type: "sell",
        unitCost: 20,
        quantity: 50,
      };

      processSellOperation(
        transaction,
        operation,
        transaction.get("stocksQuantity") || 0
      );

      expect(transaction.get("stocksQuantity")).toBe(50);
      expect(transaction.get("stocksTotalValue")).toBe(500);
      expect(transaction.get("transactionAccumulatedLoss")).toBe(0);
      expect(transaction.get("tax")).toBe(0); // Profit is less than 20000
    });

    it("should update transaction state correctly for a sell operation with profit greater than 20000", () => {
      const transaction = createTransactionState();
      transaction.set("stocksQuantity", 1000);
      transaction.set("stocksTotalValue", 10000);
      transaction.set("stocksWeightedAverage", 10);
      const operation: Operation = {
        type: "sell",
        unitCost: 30,
        quantity: 1000,
      };

      processSellOperation(
        transaction,
        operation,
        transaction.get("stocksQuantity") || 0
      );

      expect(transaction.get("stocksQuantity")).toBe(0);
      expect(transaction.get("stocksTotalValue")).toBe(0);
      expect(transaction.get("transactionAccumulatedLoss")).toBe(0);
      expect(transaction.get("tax")).toBe(calculateTax(20000)); // Profit is greater than 20000
    });
  });

  describe("updateTransactionState", () => {
    it("should update transaction state correctly for a buy operation", () => {
      const transaction = createTransactionState();
      const operation: Operation = {
        type: "buy",
        unitCost: 10,
        quantity: 100,
      };

      updateTransactionState(transaction, operation);

      expect(transaction.get("stocksQuantity")).toBe(100);
      expect(transaction.get("stocksTotalValue")).toBe(1000);
      expect(transaction.get("stocksWeightedAverage")).toBe(10);
      expect(transaction.get("tax")).toBe(0);
    });

    it("should update transaction state correctly for a sell operation", () => {
      const transaction = createTransactionState();
      transaction.set("stocksQuantity", 100);
      transaction.set("stocksTotalValue", 1000);
      transaction.set("stocksWeightedAverage", 10);
      const operation: Operation = {
        type: "sell",
        unitCost: 20,
        quantity: 50,
      };

      updateTransactionState(transaction, operation);

      expect(transaction.get("stocksQuantity")).toBe(50);
      expect(transaction.get("stocksTotalValue")).toBe(500);
      expect(transaction.get("transactionAccumulatedLoss")).toBe(0);
      expect(transaction.get("tax")).toBe(0); // Profit is less than 20000
    });
  });

  describe("processLineOperations", () => {
    it("should process line operations correctly", () => {
      const line = JSON.stringify([
        { operation: "buy", "unit-cost": 10, quantity: 100 },
        { operation: "sell", "unit-cost": 20, quantity: 50 },
      ]);
      const expectedTaxes: Tax[] = [{ tax: 0 }, { tax: 0 }];

      expect(processLineOperations(line)).toEqual(expectedTaxes);
    });
  });
});

import { Operation } from "../type-schemas/operation.types";
import { formatMoney } from "../../shared/utility-services/utility-services";
import { operationsDTO } from "../dtos/operations.dto";
import { money, quantity } from "../../shared/enums/unit-measures.enum";
import { transactionState } from "../type-schemas/transaction-state.types";
import { Tax } from "../type-schemas/tax.types";

export const createTransactionState = (): Map<
  keyof transactionState,
  number
> => {
  return new Map<keyof transactionState, number>([
    ["stocksWeightedAverage", money.zero],
    ["stocksQuantity", money.zero],
    ["stocksTotalValue", money.zero],
    ["transactionAccumulatedLoss", money.zero],
    ["taxableProfit", money.zero],
    ["tax", money.zero],
  ]);
};

export const hasTax = (profitValue: number): boolean => {
  const maxNonTaxableOperationValue = 20000.0;
  return profitValue > maxNonTaxableOperationValue;
};

export const hasProfit = (outcome: number): boolean => outcome > 0;

export const calculateTax = (operationBalance: number): number => {
  const twentyPercent = 0.2;
  return Math.max(money.zero, operationBalance * twentyPercent);
};

export const calculateTransactionOutcome = (
  unitCost: number,
  stocksWeightedAverage: number,
  quantity: number
): number => {
  const totalSellValue = unitCost * quantity;
  const totalCostValue = stocksWeightedAverage * quantity;
  return totalSellValue - totalCostValue;
};

export const processBuyOperation = (
  transactionState: Map<keyof transactionState, number>,
  operation: Operation,
  initialStateStocksQuantity: number,
  initialStateStocksTotalValue: number
) => {
  const operationStocksTotalValue = operation.quantity * operation.unitCost;
  const updatedStocksQuantity = initialStateStocksQuantity + operation.quantity;
  const updatedStocksTotalValue =
    initialStateStocksTotalValue + operationStocksTotalValue;

  transactionState.set(
    "stocksWeightedAverage",
    updatedStocksTotalValue / updatedStocksQuantity
  );
  transactionState.set("stocksQuantity", updatedStocksQuantity);
  transactionState.set("stocksTotalValue", updatedStocksTotalValue);
  transactionState.set("tax", money.zero);
};

export const processSellOperation = (
  transactionState: Map<keyof transactionState, number>,
  operation: Operation,
  initialStateStocksQuantity: number
) => {
  const updatedTotalStocksQuantity =
    initialStateStocksQuantity - operation.quantity;
  const updatedStocksTotalValue =
    (transactionState.get("stocksWeightedAverage") || money.zero) *
    updatedTotalStocksQuantity;

  transactionState.set("stocksQuantity", updatedTotalStocksQuantity);
  transactionState.set("stocksTotalValue", updatedStocksTotalValue);

  const outcome = calculateTransactionOutcome(
    operation.unitCost,
    transactionState.get("stocksWeightedAverage") || money.zero,
    operation.quantity
  );

  const accumulatedLoss =
    transactionState.get("transactionAccumulatedLoss") || money.zero;

  if (!hasProfit(outcome)) {
    transactionState.set("tax", money.zero);
    transactionState.set(
      "transactionAccumulatedLoss",
      accumulatedLoss + Math.abs(outcome)
    );
    return;
  }

  const operationBalance = outcome - accumulatedLoss;
  const totalSellValue = operation.unitCost * operation.quantity;

  hasTax(totalSellValue)
    ? transactionState.set("tax", calculateTax(operationBalance))
    : transactionState.set("tax", money.zero);

  transactionState.set(
    "transactionAccumulatedLoss",
    Math.max(money.zero, accumulatedLoss - outcome)
  );
};

export const updateTransactionState = (
  transactionState: Map<keyof transactionState, number>,
  operation: Operation
) => {
  const initialStateStocksQuantity =
    transactionState.get("stocksQuantity") || quantity.zero;
  const initialStateStocksTotalValue =
    transactionState.get("stocksTotalValue") || money.zero;

  if (operation.type === "buy") {
    processBuyOperation(
      transactionState,
      operation,
      initialStateStocksQuantity,
      initialStateStocksTotalValue
    );
    return;
  }

  if (operation.type === "sell") {
    processSellOperation(
      transactionState,
      operation,
      initialStateStocksQuantity
    );
  }
};

export const processLineOperations = (line: string): Tax[] => {
  const operations: Operation[] = JSON.parse(line).map(operationsDTO);
  const transaction = createTransactionState();

  const taxes = operations.map((operation) => {
    updateTransactionState(transaction, operation);
    return {
      tax: formatMoney(transaction.get("tax") || money.zero),
    };
  });

  return taxes;
};

export const processOperations = (lines: string[]) =>
  lines.forEach((line) => console.log(processLineOperations(line)));

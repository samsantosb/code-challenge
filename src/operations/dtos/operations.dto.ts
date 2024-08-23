import { Operation } from "../type-schemas/operation.types";

export const operationsDTO = (stdinData: {
  operation: "buy" | "sell";
  "unit-cost": number;
  quantity: number;
}): Operation => {
  return {
    type: stdinData.operation,
    unitCost: stdinData["unit-cost"],
    quantity: stdinData.quantity,
  };
};

export type Operation = {
  type: "buy" | "sell";
  unitCost: number;
  quantity: number;
};

import { formatMoney } from "./utility-services";

describe("OperationsService", () => {
  describe("Format Money", () => {
    it("should format a number to two decimal places", () => {
      const value = 100.123456;

      const formattedValue = formatMoney(value);

      expect(formattedValue).toBe(100.12);
    });
  });
});

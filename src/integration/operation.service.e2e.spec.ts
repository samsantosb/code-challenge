// OperationsServiceE2ETests.ts
import { processOperations } from "../operations/services/operations.service";
import inputOperationMock from "./operation.input.mocks";

describe("OperationsServiceE2ETests", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe("Process Operations", () => {
    it("should do a transaction that doesn't meet the taxable minimum value", () => {
      const caseOne = inputOperationMock.generateCaseOneInput();

      processOperations([caseOne]);

      expect(consoleSpy).toHaveBeenCalledWith([
        { tax: 0 },
        { tax: 0 },
        { tax: 0 },
      ]);
    });

    it("should do a transaction that meets the taxable minimum value and after it realize a loss", () => {
      const caseTwo = inputOperationMock.generateCaseTwoInput();

      processOperations([caseTwo]);

      expect(consoleSpy).toHaveBeenCalledWith([
        { tax: 0 },
        { tax: 10000 },
        { tax: 0 },
      ]);
    });

    it("should do two transactions and log it separately", () => {
      const caseOne = inputOperationMock.generateCaseOneInput();
      const caseTwo = inputOperationMock.generateCaseTwoInput();

      processOperations([caseOne, caseTwo]);

      expect(consoleSpy).toHaveBeenNthCalledWith(1, [
        { tax: 0 },
        { tax: 0 },
        { tax: 0 },
      ]);
      expect(consoleSpy).toHaveBeenNthCalledWith(2, [
        { tax: 0 },
        { tax: 10000 },
        { tax: 0 },
      ]);
    });

    it("should do a transaction whose composition is: stocks buy, then loss, then profit over minimum tax value", () => {
      const caseThree = inputOperationMock.generateCaseThreeInput();

      processOperations([caseThree]);

      expect(consoleSpy).toHaveBeenCalledWith([
        { tax: 0 },
        { tax: 0 },
        { tax: 1000 },
      ]);
    });

    it("should do a transaction where the user doesn't profit or loss", () => {
      const caseFour = inputOperationMock.generateCaseFourInput();

      processOperations([caseFour]);

      expect(consoleSpy).toHaveBeenCalledWith([
        { tax: 0 },
        { tax: 0 },
        { tax: 0 },
      ]);
    });

    it("should do a transaction where the user doesn't profit in the first sell operation but profits in the second, based on weighted average", () => {
      const caseFive = inputOperationMock.generateCaseFiveInput();

      processOperations([caseFive]);

      expect(consoleSpy).toHaveBeenCalledWith([
        { tax: 0 },
        { tax: 0 },
        { tax: 0 },
        { tax: 10000 },
      ]);
    });

    it("should do a transaction where accumulated loss is greater than the profit", () => {
      const caseSix = inputOperationMock.generateCaseSixInput();

      processOperations([caseSix]);

      expect(consoleSpy).toHaveBeenCalledWith([
        { tax: 0.0 },
        { tax: 0.0 },
        { tax: 0.0 },
        { tax: 0.0 },
        { tax: 3000.0 },
      ]);
    });

    it("should do a long transaction that evaluates the upper use cases", () => {
      const caseSeven = inputOperationMock.generateCaseSevenInput();

      processOperations([caseSeven]);

      expect(consoleSpy).toHaveBeenCalledWith([
        { tax: 0.0 },
        { tax: 0.0 },
        { tax: 0.0 },
        { tax: 0.0 },
        { tax: 3000.0 },
        { tax: 0.0 },
        { tax: 0.0 },
        { tax: 3700.0 },
        { tax: 0.0 },
      ]);
    });

    it("should do a transaction where the user profits two times", () => {
      const caseEight = inputOperationMock.generateCaseEightInput();

      processOperations([caseEight]);

      expect(consoleSpy).toHaveBeenCalledWith([
        { tax: 0.0 },
        { tax: 80000.0 },
        { tax: 0.0 },
        { tax: 60000.0 },
      ]);
    });
  });
});

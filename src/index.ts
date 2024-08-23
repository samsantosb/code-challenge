import { stdin } from "process";
import { processOperations } from "./operations/services/operations.service";

const runApp = (input = "") => {
  stdin.on("data", (data) => {
    input += data.toString();
  });

  stdin.on("end", () => {
    const onLineBreak = "\n";
    const lines = input.trim().split(onLineBreak);
    processOperations(lines);
    process.exit(0); // Adicione esta linha para encerrar o processo após a execução
  });

  stdin.on("error", ({ message }) => {
    console.error("Erro ao ler a entrada:", message);
    process.exit(1); // Adicione esta linha para encerrar o processo com erro
  });
};

runApp();

# Code Challenge - Ganho de Capital

## Decisões

- Estrutura: Escolhi trabalhar com TS/Node por ser ecossistema de maior domínio e decidi trabalhar com Arquitetura Modular, com Layers direcionadas para esse caso de uso. Costumo priorizar Package by Feature em implementações e acredito que Layered Arc executada de maneira simples evita
  excesso de boilerplate e complexidade adicional.

- Bibiliotecas:
  - Jest: Lib tradicional de teste do ecossistema JS/TS

## Documentações extras

- **JSDOCs** - Os mocks dos testes de integração estão em funções com JSDOCs para tentar explicitar
  melhor os cases exemplos sugeridos
- Funções de utilidade global também utilizam JSDOCs

---

## Como rodar a aplicação/Validar manualmente os inputs

Tendo o docker no seu PC

`docker-compose up app`

Alterar o arquivo INPUT.TXT e salva-lo irá disparar o HOT RELOAD da lib Nodemon simulando
outro input

## Testes

Para executar os testes automatizados basta executar o comando:

`docker-compose run test`

## Typescript e Jest

Caso você tenha interesse em remover da IDE erros de Typescript nos testes
Rodar NPM Install na pasta raiz para que o TS consiga identificar o JEST

# Use a imagem oficial do Node.js
FROM node:20

# Crie um diretório de trabalho
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta da aplicação (se necessário)
EXPOSE 4000

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]

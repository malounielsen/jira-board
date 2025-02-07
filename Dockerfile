# Välj en officiell Node.js image som bas
FROM node:16

# Skapa och definiera arbetsmappen i containern
WORKDIR /usr/src/app

# Kopiera package.json och package-lock.json först för att installera beroenden
COPY package*.json ./

# Installera alla beroenden
RUN npm install

# Kopiera hela frontend-koden till containern
COPY . .

# Exponera port 3000 (standardporten för React)
EXPOSE 3000

# Starta utvecklingsservern
CMD ["npm", "start"]



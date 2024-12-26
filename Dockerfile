FROM --platform=linux/arm64 node:18-alpine

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    curl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

EXPOSE 3000

# Use a shell to run the command
CMD ["node", "dist/index.js"]
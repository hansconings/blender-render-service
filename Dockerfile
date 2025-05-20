FROM blender/blender:3.6.1

# Install Node.js
RUN apt update && apt install -y curl gnupg
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt install -y nodejs

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]

# Use an official Node runtime as the base image
# Step 1: Build the React app
FROM node:16 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# Step 2: Serve the app using `serve`
FROM node:16
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/build ./build
CMD ["serve", "-s", "-l", "3000", "build"]

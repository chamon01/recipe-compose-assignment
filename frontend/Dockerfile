# Use Node to build the React (Vite) app
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

RUN npm install

# Add this section 👇 to pass the backend URL into the build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copy the rest of the frontend code
COPY . .

# Build the app (this will now embed your backend URL)
RUN npm run build

# Use Nginx to serve the static site
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

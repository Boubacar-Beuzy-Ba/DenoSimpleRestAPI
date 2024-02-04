# Use the official Deno Docker image
FROM denoland/deno:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the necessary files into the container
COPY todo-api.ts .
COPY deps.ts .

# Allow network access
EXPOSE 8080

# Install necessary permissions for Deno inside the container
RUN deno install --unstable --allow-net --name=todo-api todo-api.ts

# Run the compiled executable
CMD ["todo-api"]

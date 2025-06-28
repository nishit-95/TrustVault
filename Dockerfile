# -------- Build Stage --------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY *.sln ./
COPY API/API.csproj ./API/
COPY Repositories/Repositories.csproj ./Repositories/

# Restore dependencies
RUN dotnet restore

# Copy full source
COPY . .

# Publish the API project
WORKDIR /src/API
RUN dotnet publish -c Release -o /app/publish

# -------- Runtime Stage --------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Optional: Expose port
EXPOSE 80

# Start the app
ENTRYPOINT ["dotnet", "API.dll"]

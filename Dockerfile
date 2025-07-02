# -------- Build Stage --------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and projects
COPY *.sln ./
COPY API/API.csproj ./API/
COPY Repositories/Repositories.csproj ./Repositories/

# Restore dependencies
RUN dotnet restore

# Copy source code
COPY . .

# Publish API project
WORKDIR /src/API
RUN dotnet publish -c Release -o /app/publish

# -------- Runtime Stage --------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy published files
COPY --from=build /app/publish .

# 📂 Manually copy the Document folder for static file access
COPY --from=build /src/API/Document ./Document

# Expose port (optional)
EXPOSE 80

# Start app
ENTRYPOINT ["dotnet", "API.dll"]

# -------- Build Stage --------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY *.sln ./
COPY API/API.csproj ./API/
COPY Repository/Repository.csproj ./Repository/

# Restore dependencies
RUN dotnet restore ./API/API.csproj

# Copy all source code
COPY . ./

# Publish the API project
WORKDIR /src/API
RUN dotnet publish -c Release -o /app/publish

# -------- Runtime Stage --------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "API.dll"]

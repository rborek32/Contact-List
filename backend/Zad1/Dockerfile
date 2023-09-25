FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Zad1/Zad1.csproj", "Zad1/"]
RUN dotnet restore "Zad1/Zad1.csproj"
COPY . .
WORKDIR "/src/Zad1"
RUN dotnet build "Zad1.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Zad1.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Zad1.dll"]

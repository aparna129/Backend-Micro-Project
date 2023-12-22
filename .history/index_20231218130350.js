const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Default Page !!");
});

app.get("/health", (req, res) => {
  const serverName = "Week List Server";
  const currentTime = new Date().toLocaleString();
  const serverState = "active";

  const healthInfo = {
    serverName: serverName,
    currentTime: currentTime,
    state: serverState,
  };

  res.json(healthInfo);
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

/*

A health API typically refers to an interface provided by a service, application, 
or system that offers endpoints for checking the health and status of that service. 
This API is commonly used to perform health checks, monitor system status, and 
verify if the service is running properly.

The purpose of a health API is to expose endpoints that can be queried to determine 
the operational status of a service. These endpoints might return information indicating 
whether the service is reachable, functioning correctly, and whether its dependencies 
(such as databases, external services, etc.) are also healthy.

*/

/
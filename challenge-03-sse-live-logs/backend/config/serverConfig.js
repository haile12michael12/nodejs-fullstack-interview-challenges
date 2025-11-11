// Port and environment configs
const serverConfig = {
  port: process.env.PORT || 3000,
  logIntervalMin: 2000,
  logIntervalMax: 5000,
  heartbeatInterval: 30000,
  maxLogsToStore: 100
};

module.exports = serverConfig;
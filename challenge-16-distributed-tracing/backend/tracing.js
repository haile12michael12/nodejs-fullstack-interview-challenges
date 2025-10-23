const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');

const setupTracing = () => {
  const serviceName = process.env.SERVICE_NAME || 'user-service';
  
  const sdk = new opentelemetry.NodeSDK({
    traceExporter: new OTLPTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4317',
    }),
    instrumentations: [getNodeAutoInstrumentations()],
    serviceName: serviceName,
  });

  sdk.start();
};

module.exports = { setupTracing };
# gRPC Echo Service Backend

This is the backend service for the gRPC Echo challenge. It implements a simple gRPC server that echoes back the messages it receives.

## Structure

- `proto/echo.proto`: Protocol Buffer definition for the Echo service
- `server.js`: gRPC server implementation
- `proxy.js`: HTTP-to-gRPC proxy server for the frontend

## Setup

```bash
npm install
```

## Running

Start the gRPC server:
```bash
npm start
```

Start the proxy server (in a separate terminal):
```bash
npm run start:proxy
```

Or run both simultaneously in development mode:
```bash
npm run dev:all
```

## Testing with grpcurl

If you have grpcurl installed, you can test the service directly:

```bash
grpcurl -plaintext localhost:50051 list
grpcurl -plaintext -d '{"message":"hello"}' localhost:50051 echo.EchoService/Echo
```
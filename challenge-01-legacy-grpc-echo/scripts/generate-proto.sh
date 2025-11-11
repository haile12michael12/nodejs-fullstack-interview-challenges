#!/bin/bash

# Script to generate protobuf code for frontend
# This script assumes you have grpc-tools and grpc-web installed globally

echo "Generating protobuf code for frontend..."

# Create output directory if it doesn't exist
mkdir -p ../frontend/src/grpc

# Generate JavaScript code for gRPC-Web
protoc \
  --js_out=import_style=commonjs:../frontend/src/grpc \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:../frontend/src/grpc \
  ../backend/proto/echo.proto

echo "Protobuf code generation completed!"
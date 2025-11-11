# Makefile for gRPC Echo challenge

# Default target
.PHONY: help
help:
	@echo "gRPC Echo Challenge Makefile"
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  install     Install all dependencies"
	@echo "  dev         Start development servers"
	@echo "  build       Build the application"
	@echo "  test        Run all tests"
	@echo "  lint        Run code quality checks"
	@echo "  proto       Generate protobuf code"
	@echo "  clean       Clean build artifacts"
	@echo "  help        Show this help message"

# Install dependencies
.PHONY: install
install:
	@echo "Installing backend dependencies..."
	cd backend && npm install
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

# Start development servers
.PHONY: dev
dev:
	@echo "Starting development servers..."
	docker-compose up

# Build the application
.PHONY: build
build:
	@echo "Building frontend..."
	cd frontend && npm run build

# Run tests
.PHONY: test
test:
	@echo "Running tests..."
	./scripts/test.sh

# Run linting
.PHONY: lint
lint:
	@echo "Running code quality checks..."
	./scripts/lint.sh

# Generate protobuf code
.PHONY: proto
proto:
	@echo "Generating protobuf code..."
	./scripts/generate-proto.sh

# Clean build artifacts
.PHONY: clean
clean:
	@echo "Cleaning build artifacts..."
	cd frontend && rm -rf dist
	cd backend && rm -rf node_modules
	cd frontend && rm -rf node_modules
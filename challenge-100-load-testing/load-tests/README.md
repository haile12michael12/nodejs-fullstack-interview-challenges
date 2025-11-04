# Load Tests

This directory contains all the load tests for the application.

## Test Types

1. **Smoke Tests** - Basic functionality verification
2. **Baseline Tests** - Performance benchmarking
3. **Stress Tests** - Testing under high load
4. **Spike Tests** - Handling sudden traffic spikes
5. **Soak Tests** - Long-term stability testing

## Running Tests

```bash
# Run smoke test
./scripts/run-smoke.sh

# Run baseline test
./scripts/run-baseline.sh

# Run stress test
./scripts/run-stress.sh
```

## Tools

- [k6](https://k6.io/) - Load testing tool
- [Prometheus](https://prometheus.io/) - Metrics collection
- [Grafana](https://grafana.com/) - Metrics visualization
export const k6Config = {
  // Default test configuration
  baseUrl: 'http://localhost:3000',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
  // Environment-specific settings
  environments: {
    local: {
      baseUrl: 'http://localhost:3000',
      users: 10,
    },
    staging: {
      baseUrl: 'https://staging-api.example.com',
      users: 50,
    },
    production: {
      baseUrl: 'https://api.example.com',
      users: 100,
    }
  }
};
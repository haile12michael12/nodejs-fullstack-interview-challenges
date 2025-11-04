import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 50 },   // Ramp up to 50 users
    { duration: '8h', target: 50 },   // Stay at 50 users for 8 hours
    { duration: '5m', target: 0 },    // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'],   // Error rate should be less than 1%
  },
};

export default function () {
  const res = http.get('http://localhost:3000/api/metrics');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
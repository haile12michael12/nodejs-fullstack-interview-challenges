import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },   // Ramp up to 50 users
    { duration: '1m', target: 50 },   // Stay at 50 users
    { duration: '10s', target: 200 }, // Spike to 200 users
    { duration: '1m', target: 200 },  // Stay at 200 users
    { duration: '10s', target: 50 },  // Drop back to 50 users
    { duration: '1m', target: 50 },   // Stay at 50 users
    { duration: '1m', target: 0 },    // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1000ms
    http_req_failed: ['rate<0.1'],     // Error rate should be less than 10%
  },
};

export default function () {
  const res = http.get('http://localhost:3000/api/metrics');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
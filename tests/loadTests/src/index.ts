import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 100,
    duration: '10s',
};

const BASE_API_URL = 'http://localhost:3000';

export default function () {
    const res = http.get(`${BASE_API_URL}/`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}
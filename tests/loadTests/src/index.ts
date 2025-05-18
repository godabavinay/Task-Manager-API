import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 100,
    duration: '10s',
};

export default function () {
    const res = http.get('http://localhost:3000/tasks');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}
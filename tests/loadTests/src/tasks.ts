import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 100,
    duration: '10s',
};

const BASE_API_URL = 'http://localhost:3000';

export default function () {
    // Create a task
    const createTaskResponse = http.post(`${BASE_API_URL}/tasks`, JSON.stringify({ title: 'Test Task' }), {
        headers: { 'Content-Type': 'application/json' }
    });
    check(createTaskResponse, { 'create task status is 201': (res) => res.status === 201 });

    const task = JSON.parse(createTaskResponse.body!.toString());
    const taskId = task.id;

    // Get all tasks
    const getAllTasksResponse = http.get(`${BASE_API_URL}/tasks`);
    check(getAllTasksResponse, { 'get all tasks status is 200': (res) => res.status === 200 });

    const getASingleTaskResponse = http.get(`${BASE_API_URL}/tasks/${taskId}`);
    check(getASingleTaskResponse, { 'get single task status is 200': (res) => res.status === 200 });

    // Update the task
    const updateTaskResponse = http.put(`${BASE_API_URL}/tasks/${taskId}`, JSON.stringify({ title: 'Updated Task', completed: true }), {
        headers: { 'Content-Type': 'application/json' }
    });
    check(updateTaskResponse, { 'update task status is 204': (res) => res.status === 204 });

    // Delete the task
    const deleteTaskResponse = http.del(`${BASE_API_URL}/tasks/${taskId}`);
    check(deleteTaskResponse, { 'delete task status is 204': (res) => res.status === 204 });

    // Wait before the next iteration
    sleep(1);
}

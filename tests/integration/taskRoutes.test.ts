import request from 'supertest';
import { describe, it, expect, beforeEach } from 'vitest';
import app from '../../src/app';
import { resetTasks } from '../../src/controllers/tasks';

describe('Task API Integration', () => {
    beforeEach(() => {
        resetTasks();
    });

    it('should create a task', async () => {
        const response = await request(app).post('/tasks').send({
            title: 'Test Task',
        });

        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Task');
        expect(response.body.completed).toBe(false);
        expect(response.body.id).toBeDefined();
    });

    it('should list all tasks', async () => {
        const response = await request(app).get('/tasks');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a task by ID', async () => {
        const createResponse = await request(app).post('/tasks').send({
            title: 'Task to Get',
        });

        const taskId = createResponse.body.id;

        const response = await request(app).get(`/tasks/${taskId}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(taskId);
        expect(response.body.title).toBe('Task to Get');
    });

    it('should update a task', async () => {
        const createResponse = await request(app).post('/tasks').send({
            title: 'Task to Update',
        });

        const taskId = createResponse.body.id;

        const response = await request(app).put(`/tasks/${taskId}`).send({
            title: 'Updated Task',
            completed: true,
        });

        expect(response.status).toBe(204);

        const getResponse = await request(app).get(`/tasks/${taskId}`);
        expect(getResponse.body.title).toBe('Updated Task');
        expect(getResponse.body.completed).toBe(true);
    });

    it('should delete a task', async () => {
        const createResponse = await request(app).post('/tasks').send({
            title: 'Task to Delete',
        });

        const taskId = createResponse.body.id;

        const response = await request(app).delete(`/tasks/${taskId}`);

        expect(response.status).toBe(204);

        const getResponse = await request(app).get(`/tasks/${taskId}`);
        expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent task', async () => {
        const response = await request(app).get('/tasks/non-existent-id');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Task not found');
    });

    it('should return 400 for invalid task creation', async () => {
        const response = await request(app).post('/tasks').send({
            // No title provided
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Title is required');
    });

    it('should return 404 for deleting non-existent task', async () => {
        const response = await request(app).delete('/tasks/non-existent-id');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Task not found');
    });

    it('should return 404 for updating non-existent task', async () => {
        const response = await request(app).put('/tasks/non-existent-id').send({
            title: 'Updated Task',
        });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Task not found');
    });
});
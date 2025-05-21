import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTask, deleteTask, getTask, listTasks, resetTasks, updateTask } from './tasks';
import { v4 as uuidv4 } from 'uuid';

const mockResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    res.sendStatus = res.status;
    return res;
};

vi.mock('uuid', () => ({
    v4: vi.fn()
}));

const mockUUID = uuidv4 as ReturnType<typeof vi.fn>;

describe('Task Controller', () => {
    beforeEach(() => {
        resetTasks();
    });

    it('should return an empty tasks list initially', () => {
        const req = {} as any;
        const res = mockResponse();

        listTasks(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should create a new task', () => {
        mockUUID.mockReturnValue('uuid-1');
        const req = { body: { title: 'New Task' } } as any;
        const res = mockResponse();

        createTask(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            id: 'uuid-1',
            title: 'New Task',
            completed: false
        });
    });

    it('should not create a task without title', () => {
        const req = { body: {} } as any;
        const res = mockResponse();

        createTask(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Title is required' });
    })

    it('should get a task by id', () => {
        mockUUID.mockReturnValue('uuid-2');
        createTask({ body: { title: 'Task 2' } } as any, mockResponse());

        const req = { params: { id: 'uuid-2' } } as any;
        const res = mockResponse();
        getTask(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id: 'uuid-2',
            title: 'Task 2',
            completed: false
        });
    })

    it('should return 404 for non-existing task', () => {
        const req = { params: { id: 'non-existing-id' } } as any;
        const res = mockResponse();

        getTask(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });

    it('should update an existing task', () => {
        mockUUID.mockReturnValue('uuid-3');
        createTask({ body: { title: 'Task 3' } } as any, mockResponse());

        const req = {
            params: { id: 'uuid-3' },
            body: { title: 'Updated Task 3', completed: true }
        } as any;
        const res = mockResponse();

        updateTask(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
    });

    it('should return 404 when updating a non-existing task', () => {
        const req = {
            params: { id: 'non-existing-id' },
            body: { title: 'Updated Task', completed: true }
        } as any;
        const res = mockResponse();

        updateTask(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });

    it('should delete an existing task', () => {
        mockUUID.mockReturnValue('uuid-4');
        createTask({ body: { title: 'Task 4' } } as any, mockResponse());

        const req = { params: { id: 'uuid-4' } } as any;
        const res = mockResponse();

        deleteTask(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
    });

    it('should return 404 when deleting a non-existing task', () => {
        const req = { params: { id: 'non-existing-id' } } as any;
        const res = mockResponse();

        deleteTask(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });
});
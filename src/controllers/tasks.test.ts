import { describe, expect, it, vi } from 'vitest';
import { listTasks } from './tasks';

const mockResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

describe('Task Controller', () => {
    it('should return an empty tasks list initially', () => {
        const req = {} as any;
        const res = mockResponse();

        listTasks(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([]);
    });
});
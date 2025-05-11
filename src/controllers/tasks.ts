import { Request, Response } from "express";
import { Task } from "../models/task";
import { v4 as uuidv4 } from 'uuid';

const tasks: Task[] = [];

export const listTasks = (req: Request, res: Response) => {
    res.json(tasks);
}

export const getTask = (req: Request, res: Response) => {
    const task = tasks.find(task => task.id === req.params.id);

    if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }

    res.json(task);
}

export const createTask = (req: Request, res: Response) => {
    const { title } = req.body;

    if (!title) {
        res.status(400).json({ message: 'Title is required' });
        return;
    }

    const newTask: Task = {
        id: uuidv4(),
        title,
        completed: false
    };
    tasks.push(newTask);

    res.status(201).json(newTask);
}

export const updateTask = (req: Request, res: Response) => {
    const task = tasks.find(task => task.id === req.params.id);

    if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }

    const { title, completed } = req.body;

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
}

export const deleteTask = (req: Request, res: Response) => {
    const taskIndex = tasks.findIndex(task => task.id === req.params.id);

    if (taskIndex === -1) {
        res.status(404).json({ message: "Task not found" });
        return;
    }

    tasks.splice(taskIndex, 1);

    res.status(204).send();
}

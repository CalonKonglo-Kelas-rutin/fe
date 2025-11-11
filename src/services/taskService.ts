/**
 * Task Service - Handles all task-related business logic
 * In a real app, this would call APIs or database
 */

import { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task';

// Mock data storage
const tasks: Task[] = [
  {
    id: '1',
    title: 'Setup Project Structure',
    description: 'Create a clean and simple project structure',
    status: 'completed',
    createdAt: '2025-11-10T00:00:00.000Z',
    updatedAt: '2025-11-10T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Build Task Feature',
    description: 'Implement task management functionality',
    status: 'in-progress',
    createdAt: '2025-11-11T00:00:00.000Z',
    updatedAt: '2025-11-11T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'Add Styling',
    description: 'Style the components with Tailwind CSS',
    status: 'pending',
    createdAt: '2025-11-11T00:00:00.000Z',
    updatedAt: '2025-11-11T00:00:00.000Z',
  },
];

export const taskService = {
  // Get all tasks
  async getAllTasks(): Promise<Task[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...tasks];
  },

  // Get task by ID
  async getTaskById(id: string): Promise<Task | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return tasks.find(task => task.id === id) || null;
  },

  // Create new task
  async createTask(input: CreateTaskInput): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 100));

    const now = new Date().toISOString();
    const newTask: Task = {
      id: Date.now().toString(),
      title: input.title,
      description: input.description,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };

    tasks.push(newTask);
    return newTask;
  },

  // Update existing task
  async updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 100));

    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }

    tasks[index] = {
      ...tasks[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };

    return tasks[index];
  },

  // Delete task
  async deleteTask(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));

    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }

    tasks.splice(index, 1);
  },
};

'use client';

import { useState, useEffect } from 'react';
import { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task';
import { taskService } from '@/services/taskService';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Create task
  const createTask = async (input: CreateTaskInput) => {
    try {
      setError(null);
      const newTask = await taskService.createTask(input);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      throw err;
    }
  };

  // Update task
  const updateTask = async (id: string, input: UpdateTaskInput) => {
    try {
      setError(null);
      const updatedTask = await taskService.updateTask(id, input);
      setTasks(prev => prev.map(task => (task.id === id ? updatedTask : task)));
      return updatedTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      throw err;
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    try {
      setError(null);
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      throw err;
    }
  };

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
}

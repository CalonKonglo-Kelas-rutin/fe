'use client';

import { useTasks } from '@/hooks/use-task';
import { TaskCard } from './task-card';
import { TaskForm } from './task-form';

export function TaskList() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TaskForm onSubmit={createTask} />
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your Tasks ({tasks.length})
        </h2>
        
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No tasks yet. Create your first task above!
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(id, status) => updateTask(id, { status })}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

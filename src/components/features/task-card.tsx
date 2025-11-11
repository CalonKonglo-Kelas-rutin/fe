'use client';

import { Task, TaskStatus } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const statusConfig: Record<TaskStatus, { label: string; variant: 'default' | 'warning' | 'success' }> = {
    pending: { label: 'Pending', variant: 'default' },
    'in-progress': { label: 'In Progress', variant: 'warning' },
    completed: { label: 'Completed', variant: 'success' },
  };

  const getNextStatus = (currentStatus: TaskStatus): TaskStatus => {
    const statusFlow: Record<TaskStatus, TaskStatus> = {
      pending: 'in-progress',
      'in-progress': 'completed',
      completed: 'pending',
    };
    return statusFlow[currentStatus];
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{task.title}</CardTitle>
          <Badge variant={statusConfig[task.status].variant}>
            {statusConfig[task.status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{task.description}</p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() => onStatusChange(task.id, getNextStatus(task.status))}
          >
            {task.status === 'completed' ? 'Reset' : 'Next Status'}
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

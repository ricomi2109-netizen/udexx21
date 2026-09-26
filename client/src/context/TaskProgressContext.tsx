import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { airdropTasks } from '@/data/tasks';

interface StoredProgress {
  completedAt: Record<string, string>;
  ids?: string[];
}

interface TaskProgressValue {
  completedTaskIds: Set<string>;
  completedAt: Record<string, string>;
  completedCount: number;
  totalReward: number;
  completeTask: (taskId: string) => void;
  resetProgress: () => void;
}

const TaskProgressContext = createContext<TaskProgressValue | null>(null);

function getStorageKey(address: string | null) {
  return address ? `aurora:task-progress:${address.toLowerCase()}` : null;
}

function loadProgress(address: string | null): StoredProgress {
  if (!address || typeof window === 'undefined') return { completedAt: {} };

  try {
    const key = getStorageKey(address);
    const saved = key ? JSON.parse(window.localStorage.getItem(key) ?? 'null') : null;
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      const ids = Array.isArray(saved.ids) ? saved.ids.filter((id: unknown): id is string => typeof id === 'string') : [];
      const completedAt = saved.completedAt && typeof saved.completedAt === 'object' ? saved.completedAt : {};
      return { ids, completedAt };
    }

    // Migrate progress created by the original task list implementation.
    const legacy = JSON.parse(window.localStorage.getItem(`aurora:completed-tasks:${address.toLowerCase()}`) ?? '[]');
    const ids = Array.isArray(legacy) ? legacy.filter((id): id is string => typeof id === 'string') : [];
    return { ids, completedAt: {} };
  } catch {
    return { completedAt: {} };
  }
}

export function TaskProgressProvider({ address, children }: { address: string | null; children: ReactNode }) {
  const [progress, setProgress] = useState<StoredProgress>(() => loadProgress(address));
  const storageKey = getStorageKey(address);

  useEffect(() => {
    setProgress(loadProgress(address));
  }, [address]);

  useEffect(() => {
    if (!storageKey) return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === storageKey) setProgress(loadProgress(address));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [address, storageKey]);

  const completedTaskIds = useMemo(() => new Set(progress.ids ?? Object.keys(progress.completedAt)), [progress]);
  const completedCount = Array.from(completedTaskIds).filter((id) => airdropTasks.some((task) => task.id === id)).length;
  const totalReward = airdropTasks.reduce(
    (sum, task) => completedTaskIds.has(task.id) ? sum + parseInt(task.reward.replace(/[^0-9]/g, ''), 10) : sum,
    0,
  );

  const persist = (next: StoredProgress) => {
    setProgress(next);
    if (storageKey) window.localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const completeTask = (taskId: string) => {
    if (!storageKey || !airdropTasks.some((task) => task.id === taskId)) return;
    const ids = new Set(progress.ids ?? Object.keys(progress.completedAt));
    if (ids.has(taskId)) return;
    ids.add(taskId);
    persist({
      ids: Array.from(ids),
      completedAt: { ...progress.completedAt, [taskId]: new Date().toISOString() },
    });
  };

  const resetProgress = () => {
    setProgress({ completedAt: {} });
    if (storageKey) {
      window.localStorage.removeItem(storageKey);
      window.localStorage.removeItem(`aurora:completed-tasks:${address?.toLowerCase()}`);
    }
  };

  return (
    <TaskProgressContext.Provider value={{ completedTaskIds, completedAt: progress.completedAt, completedCount, totalReward, completeTask, resetProgress }}>
      {children}
    </TaskProgressContext.Provider>
  );
}

export function useTaskProgress() {
  const context = useContext(TaskProgressContext);
  if (!context) throw new Error('useTaskProgress must be used within TaskProgressProvider');
  return context;
}

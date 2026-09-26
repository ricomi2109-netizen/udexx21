import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { airdropTasks } from '@/data/tasks';
import { toast } from 'sonner';

interface StoredProgress {
  ids: string[];
  completedAt: Record<string, string>;
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

function normalizeProgress(value: unknown): StoredProgress {
  if (!value || typeof value !== 'object') return { ids: [], completedAt: {} };
  const record = value as { ids?: unknown; completedAt?: unknown };
  const ids = Array.isArray(record.ids) ? record.ids.filter((id): id is string => typeof id === 'string') : [];
  const completedAt = record.completedAt && typeof record.completedAt === 'object'
    ? Object.fromEntries(Object.entries(record.completedAt).filter(([, timestamp]) => typeof timestamp === 'string'))
    : {};
  return { ids, completedAt };
}

function loadLocalProgress(address: string | null): StoredProgress {
  if (!address || typeof window === 'undefined') return { ids: [], completedAt: {} };
  try {
    const saved = JSON.parse(window.localStorage.getItem(getStorageKey(address)!) ?? 'null');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) return normalizeProgress(saved);

    // Migrate progress created by the original task list implementation.
    const legacy = JSON.parse(window.localStorage.getItem(`aurora:completed-tasks:${address.toLowerCase()}`) ?? '[]');
    const ids = Array.isArray(legacy) ? legacy.filter((id): id is string => typeof id === 'string') : [];
    return { ids, completedAt: {} };
  } catch {
    return { ids: [], completedAt: {} };
  }
}

function mergeProgress(first: StoredProgress, second: StoredProgress): StoredProgress {
  const ids = Array.from(new Set([...first.ids, ...second.ids]));
  return { ids, completedAt: { ...first.completedAt, ...second.completedAt } };
}

export function TaskProgressProvider({ address, children }: { address: string | null; children: ReactNode }) {
  const [progress, setProgress] = useState<StoredProgress>(() => loadLocalProgress(address));
  const storageKey = getStorageKey(address);

  const saveLocalProgress = (next: StoredProgress) => {
    setProgress(next);
    if (storageKey) window.localStorage.setItem(storageKey, JSON.stringify(next));
  };

  useEffect(() => {
    const localProgress = loadLocalProgress(address);
    setProgress(localProgress);
    if (!address) return;

    const controller = new AbortController();
    void fetch(`/api/progress/${address}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Progress API unavailable')))
      .then((remote) => {
        const merged = mergeProgress(localProgress, normalizeProgress(remote));
        saveLocalProgress(merged);
        const remoteIds = new Set(normalizeProgress(remote).ids);
        for (const taskId of localProgress.ids) {
          if (!remoteIds.has(taskId)) {
            void fetch(`/api/progress/${address}/tasks/${taskId}`, { method: 'POST', signal: controller.signal });
          }
        }
      })
      .catch((error: unknown) => {
        if ((error as Error).name !== 'AbortError') toast.warning('Using local progress until the server reconnects.');
      });

    const handleStorage = (event: StorageEvent) => {
      if (event.key === storageKey) setProgress(loadLocalProgress(address));
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      controller.abort();
      window.removeEventListener('storage', handleStorage);
    };
  }, [address, storageKey]);

  const completedTaskIds = useMemo(() => new Set(progress.ids), [progress]);
  const completedCount = Array.from(completedTaskIds).filter((id) => airdropTasks.some((task) => task.id === id)).length;
  const totalReward = airdropTasks.reduce(
    (sum, task) => completedTaskIds.has(task.id) ? sum + parseInt(task.reward.replace(/[^0-9]/g, ''), 10) : sum,
    0,
  );

  const completeTask = (taskId: string) => {
    if (!address || !airdropTasks.some((task) => task.id === taskId) || completedTaskIds.has(taskId)) return;
    const next = mergeProgress(progress, { ids: [taskId], completedAt: { [taskId]: new Date().toISOString() } });
    saveLocalProgress(next);
    void fetch(`/api/progress/${address}/tasks/${taskId}`, { method: 'POST' })
      .then((response) => {
        if (!response.ok) throw new Error('Could not save task progress');
      })
      .catch(() => toast.warning('Task saved locally; server sync will retry later.'));
  };

  const resetProgress = () => {
    saveLocalProgress({ ids: [], completedAt: {} });
    if (address) {
      window.localStorage.removeItem(`aurora:completed-tasks:${address.toLowerCase()}`);
      void fetch(`/api/progress/${address}`, { method: 'DELETE' }).catch(() => toast.warning('Local progress reset; server cleanup is pending.'));
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

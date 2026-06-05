import { CircularProgress } from '@heroui/progress';

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <CircularProgress isIndeterminate size="lg" />
    </div>
  );
}

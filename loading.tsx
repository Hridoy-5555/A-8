import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <Spinner size="lg" label="Loading SkillSphere..." color="primary" />
    </div>
  );
}
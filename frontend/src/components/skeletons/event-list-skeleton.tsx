import { Skeleton } from "../ui/skeleton";

export const EventListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-20 sm:h-32" />
      ))}
    </>
  );
};

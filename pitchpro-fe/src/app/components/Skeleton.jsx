export default function Skeleton({ rows = 1, width, height, mb, rounded = "rounded" }) {
  const skeletonRows = Array.from({ length: rows });

  const baseStyles = {
    height: height,
    width: width,
    marginBottom: mb,
  };

  return (
    <div role="status" className={`max-w-sm w-auto animate-pulse`}>
      {skeletonRows.map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 dark:bg-gray-700 ${rounded} ${index === 0 ? "w-full" : ""}`}
          style={{
            ...baseStyles,
            marginBottom: index < rows - 1 ? (mb !== undefined ? mb : "2.5") : mb,
          }}
        ></div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

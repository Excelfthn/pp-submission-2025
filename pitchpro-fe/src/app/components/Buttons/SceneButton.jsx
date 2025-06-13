export default function SceneButton({ children, className, onClick, isLocked, type = "default" }) {
  // Set size based on type
  const sizeClasses = type === "cutscene" ? "w-[40px] pointer-events-none h-[40px] rounded-xl" : "w-[80px] h-[80px] rounded-3xl";

  const buttonClasses = [" flex items-center justify-center", sizeClasses, isLocked ? "bg-[#E0E0E0] shadow-[0px_2px_0px_0px_#A6A6A6]" : "bg-blue-200 shadow-[0px_2px_0px_0px_#85BFFF]", className].join(" ");

  return (
    <button onClick={onClick} className={buttonClasses} disabled={isLocked}>
      {children}
    </button>
  );
}
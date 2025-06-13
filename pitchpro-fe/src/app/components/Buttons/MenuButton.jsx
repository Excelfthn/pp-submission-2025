export default function MenuButton({ color = "#80CAEA", shadowColor = "#62A4C0",onClick, children }) {
  return (
    <button
      className="text-body font-semibold text-neutral-50 rounded-3xl flex items-end justify-center text-start px-4 pb-[32px] cursor-pointer h-[128px] w-[155px]"
      onClick={onClick}
      style={{
        backgroundColor: color,
        boxShadow: `0px 4px 0px 0px ${shadowColor}`,
      }}
    >
      {children}
    </button>
  );
}

const ProgressBar = ({ progress = 50 }) => {
  return (
    <div
      className="w-full h-[18px] rounded-full bg-[#d9d9d9d9] overflow-hidden"
      style={{
        boxShadow: `
          inset 0 -2px 2px rgba(255, 255, 255, 0.6),
          inset 0 2px 2px rgba(0, 0, 0, 0.1)
        `,
      }}
    >
      <div
        className="h-full bg-[#3395FF] rounded-full transition-all duration-300"
        style={{
          width: `${progress}%`,
          boxShadow: "inset 0 -2px 2px rgba(0,0,0,0.3), inset 0 2px 2px rgba(255,255,255,0.3)",
        }}
      />
    </div>
  );
};


export default ProgressBar;
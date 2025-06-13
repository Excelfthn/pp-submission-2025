export default function IcArrow({ width = 29, backgroundColor = "#1F6DC2", height = 30 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26.1135 11.0295C26.8339 11.4126 27.4366 11.9845 27.8568 12.684C28.2771 13.3834 28.4991 14.184 28.4991 15C28.4991 15.816 28.2771 16.6166 27.8568 17.316C27.4366 18.0154 26.8339 18.5874 26.1135 18.9705L6.8955 29.421C3.801 31.1055 0 28.9155 0 25.452V4.54947C0 1.08447 3.801 -1.10403 6.8955 0.577473L26.1135 11.0295Z"
        fill={backgroundColor}
      />
    </svg>
  );
}

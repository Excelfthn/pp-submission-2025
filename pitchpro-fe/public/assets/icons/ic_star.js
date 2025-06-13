export default function IcStar({ active = false }) {
  const fillColor = active ? "#0062CC" : "#000000";

  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.4024 1.48212C11.9254 0.172625 10.0744 0.172625 9.59737 1.48212L7.43287 7.43263L1.48237 9.59713C0.172869 10.0741 0.172869 11.9251 1.48237 12.4021L7.43287 14.5666L9.59737 20.5171C10.0744 21.8266 11.9254 21.8266 12.4024 20.5171L14.5669 14.5666L20.5174 12.4021C21.8269 11.9251 21.8269 10.0741 20.5174 9.59713L14.5669 7.43263L12.4024 1.48212Z"
        fill={fillColor}
      />
    </svg>
  );
}

import React from "react";

export default function IconSkip({ direction = "forward", ...props }) {
  const isBackward = direction === "backward";
  const rotationStyle = isBackward ? { transform: "rotate(180deg)" } : {};

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={rotationStyle} {...props}>
      <path
        d="M19.2707 1.38973C19.2707 1.10241 19.1565 0.826862 18.9534 0.623698C18.7502 0.420533 18.4747 0.306396 18.1873 0.306396C17.9 0.306396 17.6245 0.420533 17.4213 0.623698C17.2181 0.826862 17.104 1.10241 17.104 1.38973V8.42706L3.5255 0.549063C2.3555 -0.126937 0.854004 0.692063 0.854004 2.05706V18.0557C0.854004 19.4207 2.35334 20.2441 3.5255 19.5659L17.104 11.6879V18.7231C17.104 19.0104 17.2181 19.2859 17.4213 19.4891C17.6245 19.6923 17.9 19.8064 18.1873 19.8064C18.4747 19.8064 18.7502 19.6923 18.9534 19.4891C19.1565 19.2859 19.2707 19.0104 19.2707 18.7231V1.38973Z"
        fill="white"
        fillOpacity="1"
      />
    </svg>
  );
}

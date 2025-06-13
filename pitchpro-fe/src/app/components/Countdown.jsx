
"use client";
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const Countdown = ({ number = 60, running = true, className = "", onComplete, ...props }) => {
  const [seconds, setSeconds] = useState(parseInt(number, 10) || 0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSeconds(parseInt(number, 10) || 0);
  }, [number]);

  useEffect(() => {
    if (running && seconds > 0 && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const newSeconds = Math.max(prev - 1, 0);
          if (newSeconds === 0) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            onComplete?.();
          }
          return newSeconds;
        });
      }, 1000);
    }

    if (!running && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [running, onComplete]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div
      className={`py-3 px-6 rounded-full items-center justify-center font-semibold text-[20px] w-full shadow-[0px_2px_0px_0px_#ADEBAD]
        bg-[#D6F5D6]  text-green-700 flex ${className}`}
      {...props}
    >
      <span className="text-title font-[550] text-green-600">{formatTime(seconds)}</span>
    </div>
  );
};

Countdown.propTypes = {
  className: PropTypes.string,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  running: PropTypes.bool,
  onComplete: PropTypes.func,
};

export default Countdown;
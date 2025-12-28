import React from "react";

function ProgressBar({ value = 0, className = "", ...props }) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`progress-root ${className}`}
      {...props}
    >
      <div
        className="progress-indicator"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}

export { ProgressBar };

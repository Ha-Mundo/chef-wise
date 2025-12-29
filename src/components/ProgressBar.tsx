import { FC, HTMLAttributes } from "react";

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ value = 0, className = "", ...props }) => {
  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`progress-root ${className}`.trim()} //.trim() prevents trailing spaces if className is empty
      {...props}
    >
      <div
        className="progress-indicator"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
};

export { ProgressBar };
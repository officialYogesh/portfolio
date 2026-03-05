import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/svg+xml";

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx="16"
          cy="16"
          r="15"
          fill="url(#gradient)"
          stroke="#ffffff"
          strokeWidth="2"
        />

        {/* Code brackets representing development */}
        <path
          d="M10 12L7 16L10 20"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M22 12L25 16L22 20"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Center dot for modern touch */}
        <circle cx="16" cy="16" r="2" fill="#ffffff" />
      </svg>
    ),
    {
      ...size,
    }
  );
}

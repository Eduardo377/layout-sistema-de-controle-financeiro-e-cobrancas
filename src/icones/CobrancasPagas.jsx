import React from "react";

const CobrancasPagas = ({ size }) => {
  return (
    <svg
      width={size ? size + "em" : "2em"}
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.0834 35.4167H5.66667C3.08934 35.4167 1 33.3274 1 30.75V6.25004C1 3.67271 3.08934 1.58337 5.66667 1.58337H20.25L30.1667 11.5V20.0001"
        stroke="#1FA7AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.5846 12.0833H19.668V2.16663"
        stroke="#1FA7AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.584 30.1666L25.5007 33.6666L33.084 23.1666"
        stroke="#1FA7AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CobrancasPagas;

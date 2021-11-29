import React from "react";

const CobrancasIcone = ({ tamanho }) => {
  return (
    <svg
      width={tamanho ? `${tamanho}em` : "1.5em"}
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 38.5H33C35.2092 38.5 37 36.7092 37 34.5V18L28.5 9.50003H16C13.7909 9.50003 12 11.2909 12 13.5V34.5C12 36.7092 13.7909 38.5 16 38.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.5 18.5H28V9.99997"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CobrancasIcone;

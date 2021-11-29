import React from "react";

const HomeIcone = ({ tamanho }) => {
  return (
    <svg
      width={tamanho ? `${tamanho}em` : "1.5em"}
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 38.5004H34.9999C37.2091 38.5004 38.9999 36.7096 38.9999 34.5004V19.5005L24.4999 9.50049L10 19.5005V34.5004C10 36.7096 11.7909 38.5004 14 38.5004Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.999 31.4986C19.999 29.2894 21.79 27.4986 23.999 27.4986H24.999C27.2082 27.4986 28.999 29.2894 28.999 31.4986V38.4986H19.999V31.4986Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcone;

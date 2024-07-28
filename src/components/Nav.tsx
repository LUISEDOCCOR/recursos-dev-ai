import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="flex justify-between py-8 text-xl">
      <figure className="flex items-center gap-3">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 8L3 12L7 16M17 8L21 12L18.5 14.5M14 4L12.799 8.805M11.997 12.012L9.99701 20M3 3L21 21"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="font-semibold transition-colors hover:text-neutral-400">
          <Link to={"/"}>Recursos DEV</Link>
        </h1>
      </figure>
      <ul className="flex items-center gap-6">
        <li className="transition-colors hover:text-neutral-400">
          <Link to={"/add"}>Añade un recurso</Link>
        </li>
      </ul>
    </nav>
  );
};

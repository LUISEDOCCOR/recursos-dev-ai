interface Props {
  label: string;
  width?: string;
}

export const Button: React.FC<Props> = ({ label, width }) => {
  return (
    <button
      className={`text-md col-span-2 mx-auto ${!width ? "w-full max-w-2xl" : width} rounded-lg border bg-neutral-700 py-2 text-lg outline-none transition-opacity hover:opacity-70 focus:ring-neutral-500`}
      type="submit"
    >
      {label}
    </button>
  );
};

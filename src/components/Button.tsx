interface Props {
  label: string;
  width?: string;
}

export const Button: React.FC<Props> = ({ label, width }) => {
  return (
    <button
      className={`mx-auto text-lg ${!width ? "w-full max-w-2xl" : width} rounded-sm border border-neutral-700 py-2 outline-none transition-colors hover:bg-neutral-700`}
      type="submit"
    >
      {label}
    </button>
  );
};

interface Props {
  label: string;
  style?: string;
}

export const Button: React.FC<Props> = ({ label, style }) => {
  return (
    <button
      className={`mx-auto ${!style ? "w-full max-w-2xl" : style} rounded-sm border border-neutral-700 py-2 outline-none transition-colors hover:bg-neutral-800`}
      type="submit"
    >
      {label}
    </button>
  );
};

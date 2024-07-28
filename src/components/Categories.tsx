import { useGetData } from "../hooks/useGetData";
import { Category } from "../types";
import { useState, useEffect, ChangeEvent } from "react";

interface Props {
  name: string;
  label: string;
  id: string;
  inputClass?: string;
  labelClass?: string;
  onChange?: (category: Category | undefined) => void;
  currentCategory?: React.Dispatch<React.SetStateAction<Category | undefined>>;
}

export const Categories: React.FC<Props> = ({
  name,
  label,
  id,
  inputClass,
  labelClass,
  onChange,
  currentCategory,
}) => {
  const { categories, isLoading, setEndpoint } = useGetData();
  const [category, setCategory] = useState<Category>();

  const selectCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    const cat = categories?.find(
      (item) => item.id == parseInt(event.target.value),
    );
    setCategory(cat);
    if (onChange) {
      onChange(cat);
    }
    if (currentCategory) {
      currentCategory(cat);
    }
  };

  useEffect(() => {
    setEndpoint("categories");
  }, []);

  useEffect(() => {
    if (categories) {
      setCategory(categories[0]);
      if (currentCategory) {
        currentCategory(categories[0]);
      }
    }
  }, [categories]);

  return !isLoading && categories.length > 0 ? (
    <div className="flex h-auto flex-col gap-4">
      <label className={labelClass || "text-lg"} htmlFor={id}>
        {label}
      </label>
      <select
        className={
          inputClass ||
          "text-md w-full max-w-2xl rounded-lg border p-4 text-lg outline-none"
        }
        id={id}
        onChange={selectCategory}
        value={category?.id}
        name={name}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <span>Loading..</span>
  );
};

import { useGetData } from "../hooks/useGetData";
import { Category } from "../types";
import { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  label: string;
  id: string;
  inputClass?: string;
  labelClass?: string;
  onChange?: (category: Category | undefined) => void;
  currentCategory?: React.Dispatch<React.SetStateAction<Category | undefined>>;
  callback?: React.Dispatch<React.SetStateAction<string>>;
}

export const Categories: React.FC<Props> = ({
  name,
  label,
  id,
  inputClass,
  labelClass,
  onChange,
  currentCategory,
  callback,
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
    if (callback) {
      callback("");
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

  return !isLoading ? (
    <div className="flex h-auto flex-col gap-4">
      <label className={labelClass || "text-lg"} htmlFor={id}>
        {label}
      </label>
      {categories.length != 0 ? (
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
      ) : (
        <h2 className="text-md">
          No hay categorias aún, agrega una
          <strong className="underline underline-offset-8">
            <Link to="/add"> Aquí</Link>
          </strong>
        </h2>
      )}
    </div>
  ) : (
    <span className="loader"></span>
  );
};

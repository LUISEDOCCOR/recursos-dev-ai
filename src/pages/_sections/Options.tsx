import { Button } from "../../components/Button";
import { Categories } from "../../components/Categories";
import { Category, Post } from "../../types";
import { FaFilter } from "react-icons/fa";
import { toast } from "sonner";
import { aiGetPosts } from "../../api/posts";
import React, { useRef, useState } from "react";
interface Props {
  setEndpoint: (endpoint: string) => {};
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Options: React.FC<Props> = ({
  setEndpoint,
  setPosts,
  setLoading,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [userMessage, setUserMessage] = useState<string>("");

  const onChange = (category: Category | undefined) => {
    setEndpoint(`category/${category?.id}`);
  };

  const clearFilters = () => {
    setEndpoint("posts");
    setUserMessage("");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const { prompt } = data;
    if (!prompt) {
      toast.error("Ingresa un mensaje");
    } else {
      setLoading(true);
      const data = await aiGetPosts(prompt as string);
      setLoading(false);
      if (data.posts.length > 0) {
        setPosts(data.posts);
        setUserMessage(data.user);
      } else {
        toast.error("No encontramos nada");
        setEndpoint("posts");
      }
      formRef.current?.reset();
    }
  };

  return (
    <section className="grid w-full grid-cols-3 gap-x-16 gap-y-8">
      <form
        ref={formRef}
        className="col-span-2 flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <label htmlFor="prompt" className="text-lg font-medium">
          ¿Necesitas ayuda? Utiliza la IA para buscar los mejores recursos para
          ti.
        </label>
        <div className="flex gap-4">
          <input
            className="text-md w-full rounded-lg border p-2 text-lg outline-none"
            name="prompt"
            id="prompt"
            placeholder="Dime los mejores cursos de React para poder aprender con proyectos."
          ></input>
          <Button label="Buscar" width="w-auto px-6" />
        </div>
      </form>

      <article className="col-span-1 flex items-end gap-4">
        <section>
          <Categories
            onChange={onChange}
            name="category"
            id="category"
            label="Filtra los recursos por categoría"
            inputClass="text-md w-full rounded-lg border p-2 text-lg outline-none"
            labelClass="text-lg font-medium"
          />
        </section>
        <section>
          <button
            aria-label="clear filters"
            onClick={clearFilters}
            className="rounded-full border border-white bg-neutral-700 p-5 transition-opacity hover:opacity-70 focus:ring-neutral-500"
          >
            <FaFilter className="h-4 w-4" />
          </button>
        </section>
      </article>
      {userMessage.length != 0 && (
        <h3 className="text-md">
          <strong className="font-bold">Tú: </strong>
          {userMessage}
        </h3>
      )}
    </section>
  );
};

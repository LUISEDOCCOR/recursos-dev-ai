import { Layout } from "../layout/layout";
import { Button } from "../components/Button";
import { Categories } from "../components/Categories";
import React, { useEffect, useRef, useState } from "react";
import { Category as CategoryType, Data } from "../types";
import { toast } from "sonner";
import { createPost } from "../api/posts";

interface Props {
  id: string;
  placeholder: string;
  label: string;
  name: string;
  type?: string;
}

const Input: React.FC<Props> = ({ id, placeholder, label, type, name }) => {
  return (
    <label htmlFor={id} className="flex flex-col gap-4">
      <span className="text-lg">{label}</span>
      <input
        placeholder={placeholder}
        id={id}
        type={type ? type : "text"}
        name={name}
        className="text-md w-full max-w-2xl rounded-lg border p-4 text-lg outline-none"
      />
    </label>
  );
};

export const AddPage = () => {
  const [category, setCategory] = useState<CategoryType>();
  const [isTwitch, setIsTwitch] = useState<boolean>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setIsTwitch(category?.name.toLowerCase() == "twitch");
  }, [category]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as Data;
    const { title, urlImage, content, src, category_id } = data;

    if (!title || (isTwitch && !urlImage) || !content || !src || !category_id) {
      toast.error("Todos los campos son necesarios");
    } else {
      if (await createPost(data)) {
        toast.success("Tu recurso está en espera para poder ser aceptado");
        formRef.current?.rest();
      } else {
        toast.info("No se puede añadir tu proyecto. Intenta más tarde.");
      }
    }
  };

  return (
    <Layout>
      <header className="space-y-4">
        <h2 className="text-2xl font-semibold">¡Añade un recurso!</h2>
        <h3 className="text-xl">Asegurate que sirva a la comunidad</h3>
      </header>
      <main className="mt-12">
        <section>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-6"
          >
            <Categories
              currentCategory={setCategory}
              name="category_id"
              id="category"
              label="Categoría"
              inputClass="text-md w-full max-w-2xl rounded-lg border p-4 text-lg outline-none"
              labelClass="text-lg font-medium"
            />
            <Input
              name="title"
              id="title"
              placeholder="..."
              label={isTwitch ? "Nombre" : "Titulo"}
            />
            {isTwitch && (
              <Input
                name="urlImage"
                id="urlImage"
                placeholder="..."
                label="Enlace de la imagen de perfil"
              />
            )}
            <Input
              name="content"
              id="content"
              placeholder="..."
              label={isTwitch ? "¿Sobre qué va este perfil?" : "Contenido "}
            />
            <Input name="src" id="src" placeholder="..." label="Link" />
            <Button label="Añadir recurso" />
          </form>
        </section>
      </main>
    </Layout>
  );
};

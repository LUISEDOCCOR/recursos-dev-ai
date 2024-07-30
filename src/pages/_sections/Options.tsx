import { Button } from "../../components/Button";
import { Post } from "../../types";
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
    <section className="w-full space-y-6">
      <form
        ref={formRef}
        className="col-span-2 flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <label htmlFor="prompt" className="text-lg font-medium">
          ¿Necesitas ayuda? Utiliza la IA para buscar los mejores recursos para
          ti.
        </label>
        <div className="flex items-end gap-4">
          <textarea
            className="text-md w-full rounded-sm border border-neutral-700 p-2 text-lg outline-none"
            name="prompt"
            id="prompt"
            placeholder="Dime los mejores cursos de React para poder aprender con proyectos."
          ></textarea>
          <Button label="Buscar" width="w-auto px-6" />
        </div>
      </form>
      {userMessage.length != 0 && (
        <div className="space-y-2">
          <h3 className="text-md">
            <strong className="font-bold">Tú: </strong>
            {userMessage}
          </h3>
          <button
            className="dm-mono text-sm font-bold underline underline-offset-8"
            onClick={() => {
              setEndpoint("posts");
              setUserMessage("");
            }}
          >
            Limpiar
          </button>
        </div>
      )}
    </section>
  );
};

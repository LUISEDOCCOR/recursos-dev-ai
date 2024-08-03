import { Button } from "../../components/Button";
import { Post } from "../../types";
import { toast } from "sonner";
import { aiGetPosts } from "../../api/posts";
import React, { useRef } from "react";
interface Props {
  setEndpoint: (endpoint: string) => {};
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const Options: React.FC<Props> = ({
  setEndpoint,
  setPosts,
  setLoading,
  setUserMessage,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

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
      <form ref={formRef} className="space-y-4" onSubmit={onSubmit}>
        <label htmlFor="prompt" className="text-lg font-medium">
          ¿Necesitas ayuda? Utiliza la IA para buscar los mejores recursos para
          ti.
        </label>
        <textarea
          className="text-md w-full rounded-sm border border-neutral-700 p-2 text-lg outline-none"
          rows={4}
          name="prompt"
          id="prompt"
          placeholder="Dime los mejores cursos de React para poder aprender con proyectos."
        ></textarea>
        <Button label="Buscar" width="w-auto px-6" />
      </form>
    </section>
  );
};

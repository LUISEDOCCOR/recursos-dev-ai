import { Post } from "../../components/Post";
import { Post as PostType } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  Posts: PostType[];
  isLoading: boolean;
  userMessage: string;
  setEndpoint: (endpoint: string) => {};
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const Posts: React.FC<Props> = ({
  Posts,
  isLoading,
  setEndpoint,
  userMessage,
  setUserMessage,
}) => {
  return (
    <section>
      {isLoading ? (
        <div className="flex w-full justify-center">
          <span className="loader"></span>
        </div>
      ) : Posts?.length == 0 ? (
        <h2 className="text-xl">
          No hay recursos aún, agrega uno
          <strong className="underline underline-offset-8">
            <Link to="/add"> Aquí</Link>
          </strong>
        </h2>
      ) : (
        <div className="space-y-6">
          <article className="space-y-4">
            <h3 className="text-md font-semibold">
              👀 Ninguno de estos recursos es de nosotros.
            </h3>
            {userMessage.length != 0 && (
              <div className="space-y-2">
                <h2 className="text-md">
                  <strong className="font-bold">Tú: </strong>
                  {userMessage}
                </h2>
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
          </article>
          <div className="flex flex-wrap justify-start gap-4">
            {Posts?.map((post: PostType) => <Post key={post.id} post={post} />)}
          </div>
        </div>
      )}
    </section>
  );
};

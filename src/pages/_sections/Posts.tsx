import { Post } from "../../components/Post";
import { Post as PostType } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  Posts: PostType[];
  isLoading: boolean;
}

export const Posts: React.FC<Props> = ({ Posts, isLoading }) => {
  return (
    <section className="grid grid-cols-5 gap-4">
      {isLoading ? (
        <div className="col-span-5 flex justify-center">
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
        Posts?.map((post: PostType) => <Post key={post.id} post={post} />)
      )}
    </section>
  );
};

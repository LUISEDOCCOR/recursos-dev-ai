import { Layout } from "../layout/layout";
import { Posts as PostComponent } from "./_sections/Posts";
import { Options } from "./_sections/Options";
import { useGetData } from "../hooks/useGetData";
import { useEffect, useState } from "react";
export const HomePage = () => {
  const { posts, isLoading, setEndpoint, setPosts, setLoading, categories } =
    useGetData();

  useEffect(() => {
    setEndpoint("posts");
    setEndpoint("categories");
  }, []);

  const [userMessage, setUserMessage] = useState<string>("");
  const [currentIdCategory, setIdCategory] = useState<number>(0);

  const handleClick = (id: number) => {
    if (id != currentIdCategory) {
      setIdCategory(id);
      setEndpoint(id == 0 ? "posts" : `category/${id}`);
    }
  };

  const classNameButtonCategory = (id: number) => {
    return `text-lg ${id == currentIdCategory && "underline underline-offset-8 font-semibold"}`;
  };

  return (
    <Layout>
      <div className="flex h-full w-full">
        <div className="fixed bottom-0 top-16 z-10 hidden w-96 space-y-8 border-r border-neutral-700 px-6 pt-12 xl:block">
          <Options
            setUserMessage={setUserMessage}
            setEndpoint={setEndpoint}
            setPosts={setPosts}
            setLoading={setLoading}
            setIdCategory={setIdCategory}
          />
          <section className="space-y-2">
            <label className="text-xl font-medium">Categorías</label>
            <ul className="space-y-3">
              <li className="text-lg">
                <button
                  onClick={() => {
                    handleClick(0);
                  }}
                  className={classNameButtonCategory(0)}
                >
                  Todos
                </button>
              </li>
              {categories.map(({ name, id }) => (
                <li key={id}>
                  <button
                    onClick={() => {
                      handleClick(id);
                    }}
                    className={classNameButtonCategory(id)}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="ml-0 w-full px-0 xl:ml-96 xl:px-6">
          <main className="mt-12">
            <PostComponent
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              Posts={posts}
              isLoading={isLoading}
              setEndpoint={setEndpoint}
            />
          </main>
        </div>
      </div>
    </Layout>
  );
};

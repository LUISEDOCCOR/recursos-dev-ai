import { Layout } from "../layout/layout";
import { Posts as PostComponent } from "./_sections/Posts";
import { Options } from "./_sections/Options";
import { useGetData } from "../hooks/useGetData";
import { useEffect } from "react";
export const HomePage = () => {
  const { posts, isLoading, setEndpoint, setPosts, setLoading } = useGetData();

  useEffect(() => {
    setEndpoint("posts");
  }, []);

  return (
    <Layout>
      <main className="mt-12 space-y-12">
        <Options
          setEndpoint={setEndpoint}
          setPosts={setPosts}
          setLoading={setLoading}
        />
        <PostComponent Posts={posts} isLoading={isLoading} />
      </main>
    </Layout>
  );
};

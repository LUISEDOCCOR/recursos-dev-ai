export type Category = {
  name: string;
  id: number;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  src: string;
  isPublic: boolean;
  createAt: string;
  category_id: number;
  category: Category;
  urlImage: string;
};

export type Data = {
  title: string;
  content: string;
  src: string;
  urlImage: string;
  category_id: string;
};

export type AIPosts = {
  posts: Post[];
  user: string;
};

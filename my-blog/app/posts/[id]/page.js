import fs from 'fs';
import path from 'path';

async function getPost(id) {
  const filePath = path.join(process.cwd(), 'public', 'posts.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const posts = JSON.parse(jsonData);
  return posts.find((post) => post.id === id);
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public', 'posts.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const posts = JSON.parse(jsonData);

  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function Post({ params }) {
  const { id } = params;
  const post = await getPost(id);

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <p>{post.content}</p>
    </div>
  );
}
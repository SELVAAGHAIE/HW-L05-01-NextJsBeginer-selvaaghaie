import Link from 'next/link';
import fs from 'fs';
import path from 'path';

async function getPosts() {
  const filePath = path.join(process.cwd(), 'public', 'posts.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container">
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
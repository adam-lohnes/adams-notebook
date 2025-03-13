import Link from 'next/link';
import { Post, Tag } from '@prisma/client';
import TagList from './TagList';

type PostWithTags = Post & {
  tags: Tag[];
};

interface PostCardProps {
  post: PostWithTags;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border-b border-gray-200 dark:border-gray-800 pb-8">
      <h2 className="text-2xl font-bold mb-2">
        <Link 
          href={`/posts/${post.slug}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {post.title}
        </Link>
      </h2>
      <div className="text-gray-600 dark:text-gray-400 mb-3">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {post.description}
      </p>
      <TagList tags={post.tags} />
    </article>
  );
} 
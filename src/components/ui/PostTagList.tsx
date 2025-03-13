'use client';

import { Tag } from '@prisma/client';
import TagList from './TagList';

interface PostTagListProps {
  tags: Tag[];
  maxVisible?: number;
}

export default function PostTagList({ tags, maxVisible = 5 }: PostTagListProps) {
  return <TagList tags={tags} maxVisible={maxVisible} />;
} 
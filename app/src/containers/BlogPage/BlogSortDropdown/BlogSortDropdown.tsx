'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BlogSortDropdownContainer } from './styled';

const getSortValueFromPath = (pathname: string): string => {
  if (pathname.startsWith('/blog/top/')) return '/blog/top/';
  return '/blog/';
};

export const BlogSortDropdown = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== pathname) {
      router.push(e.target.value);
    }
  };

  return (
    <BlogSortDropdownContainer>
      <label htmlFor="blog-sort">Sort by:</label>
      <select id="blog-sort" value={getSortValueFromPath(pathname)} onChange={handleChange}>
        <option value="/blog/">Recent</option>
        <option value="/blog/top/">Top</option>
      </select>
    </BlogSortDropdownContainer>
  );
};

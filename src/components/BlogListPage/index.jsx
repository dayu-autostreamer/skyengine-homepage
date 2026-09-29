import React from 'react';
import BlogListPage from '@theme/BlogListPage';
import EmptyBlog from '../EmptyBlog';

// Keep the native blog route, pagination, and future posts; only customize its empty state.
export default function SkyEngineBlogList(props) {
  return props.items.length ? <BlogListPage {...props} /> : <EmptyBlog />;
}

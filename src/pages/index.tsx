/* eslint-disable react/button-has-type */
import Head from 'next/head';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { RichText } from 'prismic-dom';
import Link from 'next/link';

import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { useState } from 'react';
import { useEffect } from 'react';
import { Header } from '../components/Header';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Home({ postsPagination, preview }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextPage, setNextPage] = useState('');

  useEffect(() => {
    setPosts(postsPagination.results);
    setNextPage(postsPagination.next_page);
  }, [postsPagination.results, postsPagination.next_page]);

  return (
    <>
      <Head>
        <title>Home | Space Traveling</title>
      </Head>
      <div className={styles.container}>
        <Header />
        <main className={commonStyles.content}>
          <section className={styles.posts}>
            {posts.map(post => (
              <Link href="/">
                <a>
                  <h2>{post.data.title}</h2>
                  <p>{post.data.subtitle}</p>
                  <div>
                    <span>
                      <FiCalendar color="#BBBBBB" fontSize="0.938rem" />{' '}
                      {format(
                        new Date(post.first_publication_date),
                        'dd MMM yyyy',
                        {
                          locale: ptBR,
                        }
                      )}
                    </span>
                    <span>
                      <FiUser color="#BBBBBB" fontSize="0.938rem" />
                      {post.data.author}
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          </section>
          <button>Carregar mais posts</button>
        </main>
      </div>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStaticProps: GetStaticProps<HomeProps> = async ({
  preview = false,
  previewData,
}) => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 3,
      ref: previewData?.ref ?? null,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      },
      preview,
    },
  };
};

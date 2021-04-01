/* eslint-disable react/button-has-type */
import Head from 'next/head';
import { Header } from '../components/Header';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { GetStaticProps } from 'next';

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
export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Space Traveling</title>
      </Head>
      <div className={styles.container}>
        <Header />
        <main className={commonStyles.content}>
          <section className={styles.posts}>
            <a>
              <h2>lorem ipsum dolor lorem ips</h2>
              <p>lorem ipsum dolor sit amet lorem</p>
              <div>
                <span>
                  <FiCalendar color="#BBBBBB" fontSize="0.938rem" /> 31 Mar 2021
                </span>
                <span>
                  <FiUser color="#BBBBBB" fontSize="0.938rem" /> Luan jesus
                </span>
              </div>
            </a>
            <a>
              <h2>lorem ipsum dolor lorem ips</h2>
              <p>lorem ipsum dolor sit amet lorem</p>
              <div>
                <span>
                  <FiCalendar color="#BBBBBB" fontSize="0.938rem" /> 31 Mar 2021
                </span>
                <span>
                  <FiUser color="#BBBBBB" fontSize="0.938rem" /> Luan Leone
                </span>
              </div>
            </a>
          </section>
          <button>Carregar mais posts</button>
        </main>
      </div>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };

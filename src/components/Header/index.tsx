import Link from 'next/link';

import styles from './header.module.scss';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export function Header() {
  return (
    <header className={styles.container}>
      <Link href="/">
        <a>
          <img src="spacetraveling.svg" alt="logo" />
        </a>
      </Link>
    </header>
  );
}

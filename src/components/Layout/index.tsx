import { PropsWithChildren } from 'react';
import logo from '@assets/images/logo.png';

import styles from './styles.module.scss';

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <>
            <header className={styles.header}>
                <nav>
                    <ul>
                        <li className={styles['header__item']}>
                            <img
                                className={styles['header__logo']}
                                src={logo}
                                alt="Octocat logo"
                            />
                            <span className={styles['header__title']}>
                                Github Trending Repositories
                            </span>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>© 2022 Kim Novak</footer>
        </>
    );
}

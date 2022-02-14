import { RepositoryItem } from '@api/searchRepositories';

import styles from './styles.module.scss';

interface Props {
    className: string;
    repository: RepositoryItem;
    isFavorite?: boolean;
    onClick(): void;
}

export default function RepositoriesItem({
    className,
    repository,
    isFavorite,
    onClick,
}: Props) {
    return (
        <li
            className={`${className} ${styles.item}`}
            data-testid="repository-item"
        >
            <div className={styles['item__heading']}>
                <h3 className={styles['item__title']}>
                    <a
                        href={repository.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles['item__link']}
                    >
                        {repository.full_name}
                    </a>
                </h3>
                <button
                    onClick={onClick}
                    className={styles['item__button']}
                    data-testid="favorite"
                >
                    <span className={styles['item__count']}>
                        {isFavorite
                            ? repository.stargazers_count + 1
                            : repository.stargazers_count}
                    </span>
                    Favorite{isFavorite && 'd'}
                </button>
            </div>
            <p className={styles['item__description']}>
                {repository.description}
            </p>
        </li>
    );
}

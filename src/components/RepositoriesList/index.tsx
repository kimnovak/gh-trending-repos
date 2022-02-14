import Loader from '@components/Loader';
import RepositoriesItem from '@components/RepositoriesItem';
import useRepositoriesContext from '@context/RepositoriesContext';
import isFavoriteRepo from '@utils/isFavoriteRepo';

import styles from './styles.module.scss';

export default function RepositoriesList() {
    const { favoriteRepositories, repositories, isLoading, toggleFavorite } =
        useRepositoriesContext();

    if (isLoading) {
        return <Loader />;
    }

    if (!repositories || !repositories.length) {
        return (
            <p className={styles.empty} data-testid="no-repositories">
                There are no trending 🔥 repositories :(
            </p>
        );
    }

    return (
        <ul className={styles.repositories}>
            {repositories?.map((repository) => {
                const isFavorite = !!isFavoriteRepo(
                    favoriteRepositories,
                    repository
                );
                return (
                    <RepositoriesItem
                        key={repository.id}
                        className={styles['repositories__item']}
                        repository={repository}
                        onClick={() => toggleFavorite(repository)}
                        isFavorite={isFavorite}
                    />
                );
            })}
        </ul>
    );
}

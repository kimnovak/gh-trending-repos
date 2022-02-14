import RepositoriesFilters from '@components/RepositoriesFilters';
import RepositoriesList from '@components/RepositoriesList';

import styles from './styles.module.scss';

export default function Repositories() {
    return (
        <div className={styles.repositories}>
            <RepositoriesFilters />
            <RepositoriesList />
        </div>
    );
}

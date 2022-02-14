import { FILTERS } from '@constants/filters';
import useRepositoriesContext from '@context/RepositoriesContext';

import styles from './styles.module.scss';

export default function RepositoriesFilters() {
    const { filters, toggleFilter } = useRepositoriesContext();

    return (
        <>
            {FILTERS.map(({ label, value }) => {
                const isActive = filters?.[value];
                return (
                    <button
                        key={value}
                        className={`${styles.filter} ${
                            isActive ? styles['filter--active'] : ''
                        }`}
                        onClick={() => toggleFilter(value)}
                    >
                        <span className={styles['filter__label']}>{label}</span>
                    </button>
                );
            })}
        </>
    );
}

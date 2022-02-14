import { createContext, useContext, useMemo, useState } from 'react';

import { RepositoryItem, useSearchRepositories } from '@api/searchRepositories';
import useLocalStorage from '@hooks/useLocalStorage';

interface Context {
    favoriteRepositories: RepositoryItem[];
    repositories?: RepositoryItem[];
    isLoading: boolean;
    filters?: Record<string, boolean>;
    setFilters(filters: Record<string, boolean>): void;
    toggleFilter(filter: string): void;
    toggleFavorite(repo: RepositoryItem): void;
}

export const RepositoriesContext = createContext<Context | undefined>(
    undefined
);

export default function useRepositoriesContext(): Context {
    return useContext(RepositoriesContext) ?? ({} as Context);
}

const dayInMs = 24 * 60 * 60 * 1000;
const createdSince = new Date(new Date().getTime() - 7 * dayInMs);
const createdSinceFormatted =
    createdSince.getFullYear() +
    '-' +
    String(createdSince.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(createdSince.getDate()).padStart(2, '0');

export function RepositoriesProvider({
    children,
}: React.PropsWithChildren<unknown>) {
    const [filters, setFilters] = useState<Record<string, boolean>>({});
    const { data: repositories, isLoading } = useSearchRepositories({
        q: `created:>${createdSinceFormatted}`,
        sort: 'stars',
        order: 'desc',
    });

    const [favoriteRepositories, setFavoriteRepositories] = useLocalStorage<
        RepositoryItem[]
    >('favorite-repos', []);

    function toggleFavorite(repo: RepositoryItem) {
        const isRepoInFavorites = favoriteRepositories.find(
            ({ id }) => id === repo.id
        );
        if (isRepoInFavorites) {
            setFavoriteRepositories(
                favoriteRepositories.filter(({ id }) => id !== repo.id)
            );
            return;
        }

        setFavoriteRepositories([...favoriteRepositories, repo]);
    }

    function toggleFilter(filter: string) {
        setFilters({ ...filters, [filter]: !filters[filter] });
    }

    const filteredRepositories = useMemo(() => {
        if (typeof filters !== 'undefined' && filters.byFavorites) {
            return favoriteRepositories;
        }
    }, [filters, repositories, favoriteRepositories]);

    const hasAppliedFilters = useMemo(() => {
        return Object.values(filters).some(Boolean);
    }, [filters]);

    const value = {
        filters,
        favoriteRepositories,
        repositories: hasAppliedFilters
            ? filteredRepositories
            : repositories?.items,
        isLoading,
        toggleFavorite,
        toggleFilter,
        setFilters,
    };

    return (
        <RepositoriesContext.Provider value={value}>
            {children}
        </RepositoriesContext.Provider>
    );
}

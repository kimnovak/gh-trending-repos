import { SEARCH_REPOS_API } from '@constants/api';
import { useQuery } from 'react-query';

import mockResponse from './mockResponse.json';

export type RepositoryItem = typeof mockResponse.items[0];

interface Result {
    incomplete_results: boolean;
    items: typeof mockResponse.items;
    total_count: number;
}

const RepositoryKeys = {
    all: ['repositories'] as const,
};

const searchRepositories = async (searchQuery: {}): Promise<Result> => {
    const query = new URLSearchParams(searchQuery).toString();
    let retVal;
    try {
        const response = await fetch(`${SEARCH_REPOS_API}?${query}`);
        retVal = await response.json();
    } catch (e) {
        console.error(e);
    }
    return retVal as unknown as Result;

    // use this if you hit rate limit
    // return Promise.resolve(mockResponse);
};

export const useSearchRepositories = (searchQuery: {}) =>
    useQuery<Result>(
        [...RepositoryKeys.all, searchQuery],
        async () => await searchRepositories(searchQuery),
        {
            refetchOnWindowFocus: false,
        }
    );

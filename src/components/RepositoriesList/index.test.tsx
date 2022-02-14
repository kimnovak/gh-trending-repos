import { RepositoriesContext } from '../../context/RepositoriesContext';
import { fireEvent, render } from '@testing-library/react';
import RepositoriesList from './index';
import mockRepositories from '@api/mockResponse.json';

describe('RepositoriesList', () => {
    it('should render Loader if results are loading', async () => {
        const { getByTestId } = render(
            <RepositoriesContext.Provider value={{ isLoading: true } as any}>
                <RepositoriesList />
            </RepositoriesContext.Provider>
        );

        expect(getByTestId('loader')).toBeInTheDocument();
    });

    it("shouldn't render Loader if results are not loading", async () => {
        const { queryByTestId } = render(
            <RepositoriesContext.Provider value={{ isLoading: false } as any}>
                <RepositoriesList />
            </RepositoriesContext.Provider>
        );

        expect(queryByTestId('loader')).not.toBeInTheDocument();
    });

    it('should render no trending repos if repositories array is empty', async () => {
        const { getByTestId } = render(
            <RepositoriesContext.Provider
                value={{ isLoading: false, repositories: [] } as any}
            >
                <RepositoriesList />
            </RepositoriesContext.Provider>
        );

        expect(getByTestId('no-repositories')).toBeInTheDocument();
    });

    it('should render no trending repos if repositories is undefined', async () => {
        const { getByTestId } = render(
            <RepositoriesContext.Provider value={{ isLoading: false } as any}>
                <RepositoriesList />
            </RepositoriesContext.Provider>
        );

        expect(getByTestId('no-repositories')).toBeInTheDocument();
    });

    it('should render as many repositories items as there are in the repositories list', async () => {
        const { getAllByTestId } = render(
            <RepositoriesContext.Provider
                value={
                    {
                        isLoading: false,
                        favoriteRepositories: [],
                        repositories: mockRepositories.items,
                    } as any
                }
            >
                <RepositoriesList />
            </RepositoriesContext.Provider>
        );

        expect(getAllByTestId('repository-item').length).toBe(
            mockRepositories.items.length
        );
    });

    it('should call toggleFavorite when clicking on repository item', async () => {
        const toggleFavorite = jest.fn();
        const { getAllByTestId } = render(
            <RepositoriesContext.Provider
                value={
                    {
                        isLoading: false,
                        favoriteRepositories: [],
                        repositories: mockRepositories.items,
                        toggleFavorite,
                    } as any
                }
            >
                <RepositoriesList />
            </RepositoriesContext.Provider>
        );

        const repositoryItem = getAllByTestId('favorite')[0];
        fireEvent.click(repositoryItem);
        expect(toggleFavorite).toBeCalledWith(mockRepositories.items[0]);
    });
});

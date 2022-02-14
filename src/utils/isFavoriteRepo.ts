import { RepositoryItem } from '@api/searchRepositories';

function isFavoriteRepo(
    favoriteRepositories: RepositoryItem[],
    repo: RepositoryItem
) {
    return favoriteRepositories.find(({ id }) => id === repo.id);
}

export default isFavoriteRepo;

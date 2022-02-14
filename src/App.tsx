import { QueryClientProvider } from 'react-query';

import { queryClient } from '@api/client';
import ProviderComposer from '@components/helpers/ProviderComposer';
import { RepositoriesProvider } from '@context/RepositoriesContext';
import Repositories from '@pages/Repositories';
import Layout from '@components/Layout';

import './styles/reset.scss';

function App() {
    return (
        <ProviderComposer
            contexts={[
                <QueryClientProvider client={queryClient} />,
                <RepositoriesProvider />,
            ]}
        >
            <Layout>
                <Repositories />
            </Layout>
        </ProviderComposer>
    );
}

export default App;

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from '@/stores/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom/client';
import '/app/globals.css';

import App from '@/router/App';

const queryClient = new QueryClient();

const Main = () => {
    const persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    );
};

export default Main;

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);

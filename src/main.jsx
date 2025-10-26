import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Homepage from './pages/Homepage.jsx';
import Moviespage from './pages/Moviespage.jsx';
import TvSeriesPage from './pages/TvSeriespage.jsx';
import Favorites from './pages/Favorites.jsx';
import AppLayout from './pages/AppLayout.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import DetailsPage from './pages/DetailsPage.jsx';
import Searchpage from './pages/Searchpage.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/movies" element={<Moviespage />} />
              <Route path="/tvseries" element={<TvSeriesPage />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route
                path="/movies/:id"
                element={<DetailsPage type="movie" />}
              />
              <Route
                path="/series/:id"
                element={<DetailsPage type="series" />}
              />
              <Route path="/search" element={<Searchpage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);

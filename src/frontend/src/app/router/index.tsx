import { PageLayout } from '@/components';
import {
  GoodsListPage,
  Homepage,
  NotFoundPage,
  RedirectNotFound,
  ShopCreate,
  ShopList,
  SimulationPlay,
} from '@/pages';

import { Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <PageLayout>
      <Routes>
        <Route key={'home'} element={<Homepage />} path='/' />
        <Route key={'not-found'} element={<NotFoundPage />} path='/not-found' />
        <Route
          key={'redirection-handler'}
          element={<RedirectNotFound />}
          path='/*'
        />

        <Route key='base-admin' path='admin'>
          <Route index element={<ShopList />} />
          <Route path='goods' element={<GoodsListPage />} />
          <Route path='create' element={<ShopCreate />} />
          <Route path=':id' element={<SimulationPlay />} />
        </Route>
      </Routes>
    </PageLayout>
  );
};

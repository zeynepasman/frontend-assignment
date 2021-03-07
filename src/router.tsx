
import { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Loader from './components/Loader/Loader';
const Dashboard = lazy(() => import('./containers/Dashboard'));

export default function Routes() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Switch>
          < Route path='/' >
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
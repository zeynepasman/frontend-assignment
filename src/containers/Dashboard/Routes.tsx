import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from "../../components/Loader/Loader";

const routes = [
  {
    path: '',
    component: lazy(() => import('../Currency/List')),
    exact: true,
  },
  {
    path: ':id',
    component:lazy(() => import('../Currency/Detail')),
  }
 
];

export default function AppRouter() {

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Subscriptions from './components/Subscriptions';
import Shorts from './components/Shorts';
import You from './components/You';
import Downloads from './components/Downloads';
import Home from './components/Home';
import Body from './components/Body';
import { Provider } from 'react-redux';
import store from './utils/store';
import WatchPage from './components/WatchPage';
import Feed from './components/Feed';
import Results from './components/Results';
import Login from './components/Login';

function App() {

  const router = createBrowserRouter([
    {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <Home />,
        children: [
          { path: "/results", element: <Results />},
        ]
      },
      { path: "/feed", 
        element: <Feed />,
        children: [
          { path: "/feed/shorts", element: <Shorts /> },
          { path: "/feed/subscriptions", element: <Subscriptions /> },
          { path: "/feed/downloads", element: <Downloads /> },
          { path: "/feed/you", element: <You /> },
        ],
      },
      { path: "/watch", element: <WatchPage />},
      { path: "/login", element: <Login />}
    ],
  },

  ]);


  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App

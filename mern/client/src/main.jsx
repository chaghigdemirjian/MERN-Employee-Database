import * as React from "react"; // importing react to build components. 
import * as ReactDOM from "react-dom/client"; // Importing ReactDom to render the app in the DOM.
import { // importing functions to help define and provide routing for the app. 
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// importing react components to use as elements in the routes. 
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";

// importing global styles for the app. 
import "./index.css";

const router = createBrowserRouter([ // defines a set of routes for navigation within the app. 
  {
    path: "/", // root path. loads the App component, which contains a nested route for RecordList. 
    element: <App />,
    // specifies the nested routes that will render inside the parent App component through <outlet/> tag.  
    children: [  
      {
        path: "/",
        element: <RecordList />, // when you visit the rout path, the RecordList component is rendered inside the App component. 
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Record />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <Record />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render( // renders the app inside the root element in index.html.
  <React.StrictMode>  
    <RouterProvider router={router} />  
  </React.StrictMode>
);
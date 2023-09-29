import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import CustomThemeProvider from "./components/CustomThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./pages/AllRoutes";
import Auth from "./components/Auth";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <BrowserRouter>
          <Provider store={store}>
            <CustomThemeProvider>
              <Auth>
                {/* <DndProvider backend={HTML5Backend}> */}
                <AllRoutes />
                {/* </DndProvider> */}
              </Auth>
            </CustomThemeProvider>
          </Provider>
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;

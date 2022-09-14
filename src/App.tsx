import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./lib/apollo";
import { Router } from "./Router";

function App() {
  return(
    <ApolloProvider client={apolloClient}>
      <Router />
    </ApolloProvider>

  );
}

export default App;

import { render } from "preact";
import { App } from "./app.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
const queryClient = new QueryClient();
render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>,

  document.getElementById("app")!
);

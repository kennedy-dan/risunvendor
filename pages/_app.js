import "@/styles/globals.css";
import { PrimeReactProvider } from "primereact/api";
// import "react-toastify/dist/ReactToastify.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Provider } from "react-redux";
import { persistor, store } from "../store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import AxiosConfig from "@/components/AxiosConfig";
import "react-toastify/dist/ReactToastify.css";


//core
import "primereact/resources/primereact.min.css";
export default function App({ Component, pageProps }) {
  const value = {
    ripple: true,
  };
  return (
    <Provider store={store}>

    <PrimeReactProvider value={value}>
    <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={true}
            pauseOnFocusLoss={false}
            transition={Zoom}

            // limit={1}
          />
            <PersistGate loading={null} persistor={persistor}>
            <AxiosConfig>
      <div className="font-poppins">
        <Component {...pageProps} />
      </div>
      </AxiosConfig>
      </PersistGate >
    </PrimeReactProvider>
    </Provider>
  );
}

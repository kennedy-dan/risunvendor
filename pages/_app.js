import "@/styles/globals.css";
import { PrimeReactProvider } from "primereact/api";
// import "react-toastify/dist/ReactToastify.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";


//core
import "primereact/resources/primereact.min.css";
export default function App({ Component, pageProps }) {
  const value = {
    ripple: true,
  };
  return (
    <PrimeReactProvider value={value}>
      <div className="font-poppins">
        <Component {...pageProps} />
      </div>
    </PrimeReactProvider>
  );
}

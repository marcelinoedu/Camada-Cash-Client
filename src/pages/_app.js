import "@/styles/globals.css";
import { MessageProvider } from "@/context/MessageContext";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <MessageProvider>
      {getLayout(<Component {...pageProps} />)}
    </MessageProvider>
  );
}

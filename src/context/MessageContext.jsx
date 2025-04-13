import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const showMessage = (text, type = "primary") => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, text, type }]);
  };

  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <MessageContext.Provider value={{ messages, showMessage, removeMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}

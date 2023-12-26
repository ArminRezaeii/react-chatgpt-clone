import { useState } from "react";
import "./App.css";
import { sendMessageToOpenAI } from "./openai";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSend = async () => {
    setIsLoading(true);

    try {
      const response = await sendMessageToOpenAI(input)

      setMessages([
        ...messages,
        { text: input, isUser: true },
        { text: response, isUser: false },
      ])

      setInput("");
      console.log(response);
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      <div className="App">
        <div className="chat">
          {messages.map((message, index) => (
            <>
              <div
                className={message.isUser ? "user-message" : "bot-message"}
                key={index}
              >
                {message.text}
              </div>
            </>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

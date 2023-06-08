import "./App.scss";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import ScrollableFeed from "react-scrollable-feed";
import Aside from "./Component/Aside";
import { Triangle } from "react-loader-spinner";
import { motion } from "framer-motion";

function App() {
  const [input, setInput] = useState("");
  const [botMessage, setBotMessage] = useState(null);
  const [Chat, setChat] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [Id, setId] = useState(null);
  const [history, setHistory] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [showSidebar, setShowSideBar] = useState(true);

  function clearChat() {
    const isChatPresent = history.find((obj) => obj.id === Id);
    if (isChatPresent) {
      //incase present in history
      let index = history.findIndex((obj) => obj.id === Id);
      let obj = history[index];
      obj.chat = [...Chat];
    } else {
      if (Chat.length) {
        setHistory((pre) => [
          ...pre,
          { title: currentTitle, id: Id, chat: Chat },
        ]);
      }
    }

    //reseting
    setInput("");
    setBotMessage(null);
    setChat([]);
    setCurrentTitle(null);
    setId(null);
  }

  const handleHistorySelection = (obj) => {
    console.log("Selected History", obj);
    setId(obj.id);
    setChat(obj.chat);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await axios.post("http://localhost:7000/", {
      userQuery: input,
    });
    setBotMessage(response.data.data);
    if (!Id) {
      setId(uuid());
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!currentTitle && input && botMessage) {
      setCurrentTitle(input);
    }

    if (currentTitle && input && botMessage) {
      setChat((pre) => [
        ...pre,
        {
          title: currentTitle,
          role: "user",
          content: input,
          Id,
        },
        {
          title: currentTitle,
          role: botMessage.role,
          content: botMessage.content,
          Id,
        },
      ]);
    }
  }, [botMessage, currentTitle]);

  console.log("History:", history);
  return (
    <div className="App">
        <Aside
          clearChat={clearChat}
          history={history}
          handleHistorySelection={handleHistorySelection}
          showSidebar={showSidebar}
        />
   
      <section className="main-section">
        <button
          className="side-bar-controller"
          onClick={() => setShowSideBar((pre) => !pre)}
        >
          {showSidebar ? "<" : ">"}
        </button>
        <ScrollableFeed className="chat-section">
          {Chat.length ? (
            Chat.map((chatObject) => (
              <motion.div
                className="conversation"
                animate={{ y: -20 }}
                transition={{ ease: "easeOut", duration: 1.5 }}
              >
                <div className="logo-wrapper">
                  {chatObject.role === "user" ? (
                    <img
                      src="https://i.pinimg.com/474x/91/d9/e6/91d9e688a318a7b7984f749a38c20256.jpg"
                      width={30}
                    />
                  ) : (
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/022/227/367/original/openai-chatgpt-logo-icon-free-png.png"
                      width={30}
                    />
                  )}
                </div>

                <p
                  style={
                    chatObject.role !== "user"
                      ? { backgroundColor: "rgba(9, 255, 9, 0.041)" }
                      : {}
                  }
                >
                  {chatObject.content}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="preview">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ y: [-20, 0], opacity: 1 }}
                transition={{ ease: "easeIn", duration: 1 }}
              >
               unlock a world of infinite possibilities
              </motion.p>
            </div>
          )}
        </ScrollableFeed>
        <div className="input-container">
          <div className="control-wrapper">
            <input
              type="text"
              placeholder="Send Message."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={handleSubmit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-caret-right-fill"
                viewBox="0 0 16 16"
              >
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
              </svg>
            </button>
          </div>
          {isloading && (
            <Triangle
              visible={true}
              height="25"
              width="25"
              ariaLabel="comment-loading"
              wrapperClass="comment-wrapper"
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default App;

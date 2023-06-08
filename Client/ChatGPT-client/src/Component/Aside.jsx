import {motion} from 'framer-motion';
export default function Aside({
  clearChat,
  history,
  handleHistorySelection,
  showSidebar,
}) {
  return (
    <>
      <motion.div
        className="aside"
        style={!showSidebar&&{marginLeft:"-250px"}}
        animate={{ x:[-200,0] }}
        transition={{ ease:"easeInOut", duration: 0.5 }}
      >
        <button className="new-chat-button" onClick={() => clearChat()}>
          {" "}
          ➕ New chat{" "}
        </button>

        <div className="chat-history-wrapper">
          {history.map((history) => (
            <div
              onClick={() => {
                handleHistorySelection(history);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chat-left-text"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
              </svg>{" "}
              <p>{history.title}</p>
            </div>
          ))}
        </div>
        <div className="aside-footer">
          <p>Cooked by Hareesh</p>
        </div>
      </motion.div>
    </>
  );
}

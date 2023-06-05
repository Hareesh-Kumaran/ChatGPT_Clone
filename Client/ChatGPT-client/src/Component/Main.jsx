import { useState } from "react";

export default function MainSection() {
  const [input,setInput]=useState("");

  const handleInput=()=>{
  console.log(input)
  }
 
  return (
    <section className="main-section">
      <div className="input-container">
        <div className="control-wrapper">
          <input type="text" placeholder="Send Message." value={input} onChange={(e)=>setInput(e.target.value)}/>
            
          <button onClick={handleInput}>
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
      </div>
    </section>
  );
}

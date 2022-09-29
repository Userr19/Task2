import { useRef, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import "./modal.css"
import { PostContext } from "../context/postContext";
import { useComments } from "../hooks/useComments"

export function Modal({ onClose }) {
  const ref = useRef(null)
  const node = document.getElementById("modal_root");
  const { title, body, id } = useContext(PostContext);
  const [comments] = useComments(id);
  console.log(comments);
  // useEffect(() => {
  //   function handleClick(event) {
  //     console.log(event);
  //     if (event.target instanceof Node && !ref.current?.contains(event.target))
  //       onClose();
  //   }
  //   document.addEventListener("click", handleClick);
  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   }
  // }, []);

  if (!node) {
    return null;
  }
  return ReactDOM.createPortal((
    <div className="modal-container" ref={ref}>
      <div className="modal">
        <span className="close-button" onClick={() => {
          onClose();
        }}>close</span>
        <h2 className="title">{title}</h2>
        <p>{body}</p>
        <br />
        <ul>
          {comments.map(comment => <li className="Comment"><span>{comment.user.username} : </span><span>{comment.body}</span></li>)}
        </ul>
      </div>
    </div>
  ), node)
}
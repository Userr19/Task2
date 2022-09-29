import { useState } from "react";
import "./post.css"
import {Modal} from "../Modal/Modal"

export function Post({ title }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (<li>
        <h2>
            <a href="#some" onClick={(ev) => {
                ev.preventDefault();
                setIsModalOpen(true)
            }}>
                {title}
            </a>
            {
                isModalOpen && <Modal onClose={() => {setIsModalOpen(false)}}/>
            }
        </h2>
    </li>)
}
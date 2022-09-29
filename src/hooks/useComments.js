import { useEffect, useState } from "react";

export function useComments(id) {
    const [Comments, setComments] = useState([]);
    useEffect(() => {
        fetch(`https://dummyjson.com/posts/${id}/comments`)
            .then(res => res.json())
            .then(res => setComments(res.comments));
    }, []);
    return [Comments]
}
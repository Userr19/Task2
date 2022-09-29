import { useEffect, useState } from "react";

export function usePosts() {
    const [Posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then(res => setPosts(res.posts))
            .catch(console.log);
    }, []);
    return [Posts]
}

import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../assets/config";

interface Blog {
    id: string,
    authorName: string,
    content: string,
    title: string,
    author: {
        name:string
    }
    // Add any other properties based on your actual data structure
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then(res => {
            setBlogs(res.data.posts);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        });
    }, []);

    return {
        blogs,
        loading,
    };
};

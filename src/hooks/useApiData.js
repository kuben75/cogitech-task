"use strict";
import {
    calculateUserActivity,
    calculateTodoStats,
    getTop5CommentedPosts,
    calculateAverageComments} from "../utils/dataTransformers.js";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "../constants/api.js";

export const useApiData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);

                const [usersRes, postRes, commentsRes, todosRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/users`),
                    fetch(`${API_BASE_URL}/posts`),
                    fetch(`${API_BASE_URL}/comments`),
                    fetch(`${API_BASE_URL}/todos`),
                ]);

                if(!usersRes.ok || !postRes.ok || !commentsRes.ok || !todosRes.ok) {
                    if (isMounted) {
                        setError("Błąd podczas pobierania danych z API.");
                    }
                    return;
                }

                const users = await usersRes.json();
                const posts = await postRes.json();
                const comments = await commentsRes.json();
                const todos = await todosRes.json();
                console.log("users: ", users);
                console.log("posts: ", posts);
                console.log("comments: ", comments);
                console.log("todos: ", todos);

                if (!isMounted) {
                    return;
                }

                setData({
                    userActivity: calculateUserActivity(users, posts),
                    todoStats: calculateTodoStats(todos),
                    top5Posts: getTop5CommentedPosts(posts, comments),
                    averageComments: calculateAverageComments(posts.length, comments.length),
                    totalUsers: users.length,
                    totalPosts: posts.length
                });

            } catch (e) {
                if (isMounted) {
                    setError(e.message);
                }
            }finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        void fetchData();

        return () => {
            isMounted = false;
        }

    }, []);
    return {data, loading, error};
}
import {
    calculateUserActivity,
    calculateTodoStats,
    getTop5CommentedPosts,
    calculateAverageComments, calculateTodosPerUser
} from "../utils/dataTransformers.js";
import {useEffect, useState} from "react";
import {fetchJson} from "../utils/apiClient.js";

export const useApiData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const [users, posts, comments, todos] = await Promise.all(
                    ['/users', '/posts', '/comments', '/todos'].map(endpoint =>
                        fetchJson(endpoint, controller.signal)
                    )
                );
                setData({
                    userActivity: calculateUserActivity(users, posts),
                    todoStats: calculateTodoStats(todos),
                    todosPerUser: calculateTodosPerUser(users, todos),
                    top5Posts: getTop5CommentedPosts(posts, comments),
                    averageComments: calculateAverageComments(posts.length, comments.length),
                    totalUsers: users.length,
                    totalPosts: posts.length
                });

            } catch (e) {
                if (e.name !== 'AbortError') {
                    setError(e.message);
                }
            }finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };
        void fetchData();

        return () => controller.abort();

    }, []);
    const refetch = () => {
        setLoading(true);
        setError(null);
    };

    return {data, loading, error, refetch};
}
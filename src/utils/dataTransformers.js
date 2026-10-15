"use strict";

export const calculateUserActivity = (users, posts) => {
    return users.map(u => ({
        name: u.name,
        postsCount: posts.filter(p => p.userId === u.id).length
    }));
};

export const calculateTodoStats = (todos) => {
    const completed = todos.filter(t => t.completed).length;
    return {
        completed,
        pending: todos.length - completed
    };
}

export const getTop5CommentedPosts = (posts, comments) => {
    const postCommentsCount = posts.map(p => ({
        id: p.id,
        title: p.title,
        commentsCount: comments.filter(c => c.postId === p.id).length
    }));

    return postCommentsCount.sort((a, b) => b.commentsCount - a.commentsCount).slice(0,5);
};

export const calculateAverageComments = (postsCount, commentsCount) => {
    if (postsCount === 0) {
        return 0;
    }

    return (commentsCount / postsCount).toFixed(1);
}


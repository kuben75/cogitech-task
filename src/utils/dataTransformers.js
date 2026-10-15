/**
 * Zlicza elementy pogrupowane po wskazanym kluczu używając struktury Map dla optymalizacji O(n).
 * @param {Array} items - Tablica obiektów do pogrupowania
 * @param {string} key - Klucz, po którym grupujemy
 * @returns {Map<number, number>} Mapa zliczonych elementów
 */
const countBy = (items, key) =>
    items.reduce((acc, item) => acc.set(item[key], (acc.get(item[key]) ?? 0) + 1), new Map());

/**
 * Oblicza liczbę postów dla każdego użytkownika.
 * @param {Array} users - Tablica użytkowników
 * @param {Array} posts - Tablica postów
 * @returns {Array} Tablica z aktywnością (username, postsCount)
 */
export const calculateUserActivity = (users, posts) => {
    const postsByUser = countBy(posts, 'userId');
    return users.map(u => ({
        name: u.username,
        postsCount: postsByUser.get(u.id) ?? 0
    }));
};

/**
 * Oblicza statystyki zadań TODO (zakończone, oczekujące, procent wykonania).
 * @param {Array} todos - Tablica zadań TODO
 * @returns {Object} Obiekt ze statystykami
 */
export const calculateTodoStats = (todos) => {
    const completed = todos.filter(t => t.completed).length;
    const total = todos.length;
    return {
        completed,
        pending: total - completed,
        completionRate: total ? Math.round((completed / total) * 100) : 0,
    };
}

/**
 * Zwraca 5 najbardziej komentowanych postów.
 * @param {Array} posts - Tablica postów
 * @param {Array} comments - Tablica komentarzy
 * @returns {Array} Tablica 5 postów z najwyższą liczbą komentarzy
 */
export const getTop5CommentedPosts = (posts, comments) => {
    const commentsByPost = countBy(comments, 'postId');

    const postCommentsCount = posts.map(post => ({
        id: post.id,
        title: post.title,
        commentsCount: commentsByPost.get(post.id) ?? 0
    }));

    return postCommentsCount
        .sort((a, b) => b.commentsCount - a.commentsCount)
        .slice(0, 5);
};

/**
 * Oblicza średnią liczbę komentarzy na jeden post.
 * @param {number} postsCount - Całkowita liczba postów
 * @param {number} commentsCount - Całkowita liczba komentarzy
 * @returns {string} Średnia zaokrąglona do jednego miejsca po przecinku
 */
export const calculateAverageComments = (postsCount, commentsCount) => {
    if (postsCount === 0) return "0.0";
    return (commentsCount / postsCount).toFixed(1);
};


/**
 * Oblicza status zadań TODO dla każdego użytkownika z osobna.
 * @param {Array} users Tablica użytkowników
 * @param {Array} todos Tablica zadań
 * @returns {Array} Tablica z danymi do wykresu skumulowanego
 */
export const calculateTodosPerUser = (users, todos) => {
    const completedCounts = countBy(todos.filter(t => t.completed), 'userId');
    const pendingCounts = countBy(todos.filter(t => !t.completed), 'userId');

    return users.map(u => ({
        username: u.username,
        completed: completedCounts.get(u.id) ?? 0,
        pending: pendingCounts.get(u.id) ?? 0
    }));
};

import { describe, it, expect } from 'vitest';
import {
    calculateUserActivity,
    calculateTodoStats,
    getTop5CommentedPosts,
    calculateAverageComments,
    calculateTodosPerUser
} from '../dataTransformers.js';

describe('dataTransformers', () => {
    const mockUsers = [
        { id: 1, username: 'Bret' },
        { id: 2, username: 'Antonette' }
    ];

    const mockPosts = [
        { id: 101, userId: 1, title: 'Post 1' },
        { id: 102, userId: 1, title: 'Post 2' }
    ];

    it('poprawnie zlicza posty użytkowników', () => {
        const result = calculateUserActivity(mockUsers, mockPosts);
        expect(result).toEqual([
            { name: 'Bret', postsCount: 2 },
            { name: 'Antonette', postsCount: 0 }
        ]);
    });

    it('poprawnie wylicza statystyki TODO i obsługuje pustą tablicę', () => {
        const todos = [{ completed: true }, { completed: false }, { completed: true }];
        expect(calculateTodoStats(todos)).toEqual({
            completed: 2,
            pending: 1,
            completionRate: 67
        });
        expect(calculateTodoStats([])).toEqual({
            completed: 0,
            pending: 0,
            completionRate: 0
        });
    });

    it('zwraca posortowane Top 5 postów wg liczby komentarzy', () => {
        const posts = [
            { id: 1, title: 'Mało popularny' },
            { id: 2, title: 'Hit' }
        ];
        const comments = [{ postId: 2 }, { postId: 2 }, { postId: 1 }];
        const result = getTop5CommentedPosts(posts, comments);
        expect(result[0]).toEqual({ id: 2, title: 'Hit', commentsCount: 2 });
        expect(result[1]).toEqual({ id: 1, title: 'Mało popularny', commentsCount: 1 });
    });

    it('chroni przed dzieleniem przez zero w calculateAverageComments', () => {
        expect(calculateAverageComments(0, 50)).toBe('0.0');
        expect(calculateAverageComments(10, 25)).toBe('2.5');
    });

    it('poprawnie grupuje zadania wykonane i oczekujące per użytkownik', () => {
        const todos = [
            { userId: 1, completed: true },
            { userId: 1, completed: false },
            { userId: 2, completed: true }
        ];
        expect(calculateTodosPerUser(mockUsers, todos)).toEqual([
            { username: 'Bret', completed: 1, pending: 1 },
            { username: 'Antonette', completed: 1, pending: 0 }
        ]);
    });
});
import { makeAutoObservable, flow } from 'mobx';

export class PostStore {
    posts = [];
    loading = false;
    error = null;

    constructor() {
        makeAutoObservable(this, {
            fetchPosts: flow,
        });
    }


    *fetchPosts(userId) {
        this.loading = true;
        try {
            const response = yield fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            this.posts = yield response.json();
            this.error = null;
        } catch (error) {
            this.error = error.message;
        } finally {
            this.loading = false;
        }
    }
    getPostById(postId) {
        return this.posts.find(post => post.id === postId) || null;
    }

    removePost(postId) {
        this.posts = this.posts.filter((post) => post.id !== postId);
    }

    clearPosts() {
        this.posts = [];
    }

    updatePost(postId, updatedData) {
        const index = this.posts.findIndex(post => post.id === postId);
        if (index !== -1) {
            this.posts[index] = { ...this.posts[index], ...updatedData };
        }
    }
}
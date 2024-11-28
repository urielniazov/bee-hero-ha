import { makeAutoObservable, flow } from 'mobx';

export class UserStore {
    users = [];
    loading = true;
    error = null;

    constructor() {
        makeAutoObservable(this, {
            fetchUsers: flow,
            removeUser: true,
        });
    }


    *fetchUsers() {
        this.loading = true;
        try {
            const response = yield fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            this.users = yield response.json();
            this.error = null;
        } catch (error) {
            this.error = error.message;
        } finally {
            this.loading = false;
        }
    }

    removeUser(userId) {
        this.users = this.users.filter((user) => user.id !== userId);
    }
}
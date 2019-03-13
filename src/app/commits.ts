export interface Author {
        name: string;
        email: string;
        date: string;
    }

export interface Commiter {
        name: string;
        email: string;
        date: string;
    }

export interface fullCommit {
        commit: string;
        author: Author;
        commiter: Commiter;
    }


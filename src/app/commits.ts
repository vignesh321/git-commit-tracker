/* export interface Author {
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

 */

export interface fullCommit {
    commit: string;
    authorName: string;
    authorEmail: string;
    committerName: string;
    committerEmail: string;
    committerDate: string;
    repo: string;
}


export interface newFullCommit {
    commit: string;
    authorName: string;
    authorEmail: string;
    committerName: string;
    committerEmail: string;
    committerDate: string;
    repo: string;
}

export interface commits{
    commit: String,
    author: String,
    emailId: String,
    files: fileDiff[] 
}


export interface fileDiff{
    fileType: String,
    linesAdded: number,
    linesDeleted: number
}
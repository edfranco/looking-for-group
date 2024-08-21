export const getMongoDbUri = (username: any, pw: any) => {
    return `mongodb+srv://${username}:${pw}.mongodb.net/?retryWrites=true&w=majority&appName=LFG`
}
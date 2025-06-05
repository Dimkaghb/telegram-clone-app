export type Message = {
    id: string;
    content: string;
    createdAt: Date;
    sender: 'user' | 'assistant';
}
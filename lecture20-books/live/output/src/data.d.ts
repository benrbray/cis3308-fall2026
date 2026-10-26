export interface Book {
    author: string;
    title: string;
    url: string;
}
export interface BookEntity {
    id: number;
    book: Book;
}
export declare const loadBookData: () => BookEntity[];
export declare const bookList: BookEntity[];
//# sourceMappingURL=data.d.ts.map
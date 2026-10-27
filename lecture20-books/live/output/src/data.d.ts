export interface Book {
    author: string;
    title: string;
    url: string;
}
export interface BookEntity {
    id: number;
    book: Book;
}
export declare const createBook: (book: Book) => void;
export declare const deleteBook: (id: number) => void;
export declare const getBookById: (id: number) => BookEntity | undefined;
export declare const loadBookData: () => BookEntity[];
export declare const saveBookData: (books: BookEntity[]) => void;
export declare const bookList: BookEntity[];
//# sourceMappingURL=data.d.ts.map
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
export declare const createBook: (book: Book) => void;
export declare const findBookById: (id: number) => BookEntity | undefined;
export declare const updateBook: (id: number) => void;
export declare const deleteBook: (id: number) => boolean;
export declare const bookList: BookEntity[];
//# sourceMappingURL=data.d.ts.map
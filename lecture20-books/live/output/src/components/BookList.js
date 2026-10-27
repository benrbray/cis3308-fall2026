import { jsx as _jsx } from "react/jsx-runtime";
export const BookList = (props) => {
    return _jsx("div", { className: "book-list", children: props.bookList.map(book => {
            return _jsx("div", { children: book.book.title });
        }) });
};
//# sourceMappingURL=BookList.js.map
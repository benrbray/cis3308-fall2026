import { jsx as _jsx } from "react/jsx-runtime";
import { BookList } from "./BookList.js";
import { Layout } from "./Layout.js";
export const BookPage = (props) => {
    return _jsx(Layout, { title: "Books", children: _jsx("div", { className: "column", children: _jsx(BookList, { bookList: props.bookList }) }) });
};
//# sourceMappingURL=BookPage.js.map
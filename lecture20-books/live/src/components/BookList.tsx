import type { BookEntity } from "../data.js"

export interface BookListProps {
  bookList: BookEntity[]
}

export const BookList = (
  props : BookListProps
) => {
  
  return <div className="book-list">
    {
      props.bookList.map(book => {
        return <div>
          {book.book.title}
        </div>
      })
    }
  </div>
}
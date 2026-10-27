import type { BookEntity } from "../data.js"
import { BookList } from "./BookList.js"
import { Layout } from "./Layout.js"

export interface BookPageProps {
  bookList: BookEntity[]
}

export const BookPage = (
  props: BookPageProps
) => {
  return <Layout title="Books">
    <div className="column">
      <BookList bookList={props.bookList} />
    </div>
  </Layout>
}
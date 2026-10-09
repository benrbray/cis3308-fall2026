import remarkParse from 'remark-parse';
import { unified } from 'unified';

export const markdownToHtml = async (markdown: string) => {
  const file = await unified()
    .use(remarkParse);
  
  let ast = file.processSync(markdown);
  console.log(ast);
}
// a template is any function that returns a string
export const makeTitle = (title) => {
    return `<div class="title">${title}</div>`;
};
export const makeHeading = (level, content) => {
    const tag = `h${Math.max(0, Math.min(5, level))}`;
    return `<${tag}>${content}</${tag}>`;
};
export const makeParagraph = (content) => {
    return `<p>${content}</p>`;
};
export const makeHeader = () => {
    return `<div class="header">
    <div class="header-title">Animal Blog</div>
  </div>`;
};
//# sourceMappingURL=components.js.map
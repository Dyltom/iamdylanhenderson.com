import { Paragraph, ParagraphChild } from './types';

const convertChildToMarkdown = (child: ParagraphChild): string => {
  if (child.bold) return `**${child.text}**`;
  if (child.italic) return `*${child.text}*`;
  if (child.strikethrough) return `~~${child.text}~~`;
  if (child.code) return `\`${child.text}\``;
  if (child.type === 'link') return `[${child.text}](${child.url})`;
  return child.text;
};

export const convertContentToMarkdown = (contentBlocks: Paragraph[]) => {
  return contentBlocks
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
          return block.children
            .map((child) => convertChildToMarkdown(child))
            .join('');
        case 'list':
          const items = block.children
            .map((listItem) => {
              if (!listItem.children) return '';
              return `* ${listItem.children
                .map((child) => convertChildToMarkdown(child))
                .join('')}`;
            })
            .join('\n');
          return items;
        case 'heading':
          const prefix = '#'.repeat(block.level ?? 0);
          return `${prefix} ${block.children
            .map((child) => convertChildToMarkdown(child))
            .join('')}`;
        case 'quote':
          return `> ${block.children
            .map((child) => convertChildToMarkdown(child))
            .join('')}`;
        case 'code':
          return `\`\`\`\n${block.children
            .map((child) => child.text)
            .join('\n')}\n\`\`\``;
        default:
          return '';
      }
    })
    .join('\n\n');
};

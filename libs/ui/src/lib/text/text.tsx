export interface TextProps {
  size?: TextSize;
  text: string;
}

export enum TextSize {
  Small,
  Default,
  Large,
}

export function Text({ text, size }: TextProps) {
  const classType = (size: TextSize = TextSize.Default) => {
    switch (size) {
      case TextSize.Default:
        return 'font-light text-gray-700 dark:text-gray-400 break-words';
      case TextSize.Large:
        return 'text-lg font-light text-gray-700 md:text-xl dark:text-gray-400';
      case TextSize.Small:
        return 'text-sm font-light text-gray-700 dark:text-gray-400';
    }
  };
  return <p className={classType(size)}>{text}</p>;
}

export default Text;

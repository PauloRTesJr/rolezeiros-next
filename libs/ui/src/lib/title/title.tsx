export interface TitleProps {
  size?: TitleSize;
  text: string;
}

export enum TitleSize {
  Small,
  Default,
  Large,
}

export function Title({ text, size }: TitleProps) {
  const renderText = (text: string, size: TitleSize = TitleSize.Default) => {
    switch (size) {
      case TitleSize.Default:
        return (
          <h2 className="text-3xl my-4 font-extrabold dark:text-white">
            {text}
          </h2>
        );
      case TitleSize.Large:
        return (
          <h1 className="text-4xl my-4 font-extrabold dark:text-white">
            {text}
          </h1>
        );
      case TitleSize.Small:
        return (
          <h3 className="text-2xl my-4 font-extrabold dark:text-white">
            {text}
          </h3>
        );
    }
  };
  return renderText(text, size);
}

export default Title;

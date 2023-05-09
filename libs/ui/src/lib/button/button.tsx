export interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: ButtonType;
}

export enum ButtonType {
  Default,
  Dark,
  Light,
}

export function Button({ text, onClick, type }: ButtonProps) {
  const classType = (type: ButtonType = ButtonType.Default) => {
    switch (type) {
      case ButtonType.Default:
        return 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800';
      case ButtonType.Dark:
        return 'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700';
      case ButtonType.Light:
        return 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700';
    }
  };

  return (
    <button onClick={onClick} type="button" className={classType(type)}>
      {text}
    </button>
  );
}

export default Button;

interface Buttoninterface {
  color: "blue" | "purple" | "dark" | "red";
  outlined?: boolean;
  text: string;
  onClick?: () => void;
  size: "big" | "medium" | "small";
  disabled?: boolean;
  loader?: boolean;
  type: "button" | "submit";
}

export default function Button(props: Buttoninterface) {
  const getColor = () => {
    switch (props.color) {
      case "blue":
        return props.outlined
          ? "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
      case "purple":
        return props.outlined
          ? "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-purple-300 font-medium rounded-lg me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
          : "focus:outline-none text-white font-medium rounded-lg mb-2 dark:bg-purple-700 dark:hover:bg-purple-900 dark:focus:ring-purple-900";
      case "dark":
        return props.outlined
          ? "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium rounded-lg me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          : "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium rounded-lg me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";
      case "red":
        return "text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg mb-2";
    }
  };

  const getSize = () => {
    switch (props.size) {
      case "big":
        return "px-24 py-3 text-xl font-medium text-center";
      case "medium":
        return "px-16 py-3 text-xl font-medium text-center";
      case "small":
        return "px-8 py-2.5 text-xl font-medium text-center";
    }
  };

  return (
    <button
      className={`${getColor()} ${getSize()} capitalize ${
        props.disabled && `opacity-50 pointer-events-none`
      }`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}

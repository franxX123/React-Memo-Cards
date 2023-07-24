const Button: React.FC<{
  text: string;
  type?: "submit" | "button";
  clickHandler?: () => void;
}> = ({ text, type = "button", clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      type={type}
      className="text-sm font-semibold border border-slate-200 px-4 pt-0.5 pb-1 rounded-full hover:bg-slate-100 transition duration-250"
    >
      {text}
    </button>
  );
};

export default Button;

interface ButtonProps {
  className?: string;
  children: JSX.Element | string;
  clickHandler?: () => void;
}

export const Button = ({ className, children, clickHandler }: ButtonProps) => {
  return (
    <button type="button" onClick={clickHandler} className={className}>
      {children}
    </button>
  );
};

export default Button;

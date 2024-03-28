interface ButtonProps {
  className?: string;
  children: JSX.Element | string;
}

export const Button = ({ className, children }: ButtonProps) => {
  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
};

export default Button;

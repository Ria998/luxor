interface ButtonProps {
  className?: string;
  children: JSX.Element | string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  className,
  children,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

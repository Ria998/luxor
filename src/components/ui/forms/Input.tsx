interface InputProps {
  type: string;
  id: string;
  name: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  decimals?: boolean;
  value?: string | number;
}

export const Input = ({
  type,
  id,
  name,
  onChange,
  decimals,
  value,
}: InputProps) => {
  return (
    <input
      className="text-black w-[212px] px-1"
      type={type}
      id={id}
      name={name}
      onChange={onChange}
      step={decimals ? "any" : ""}
      value={value}
    />
  );
};

export default Input;

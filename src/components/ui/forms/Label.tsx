interface LabelProps {
  htmlFor: string;
  children: string;
}

export const Label = ({ htmlFor, children }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="pr-[6px] inline-block w-[90px]">
      {children}
    </label>
  );
};

export default Label;

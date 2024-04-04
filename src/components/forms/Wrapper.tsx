interface WrapperProps {
  children: JSX.Element;
  onSubmit: (event: React.FormEvent) => void;
  header: string;
}

export const Wrapper = ({ children, onSubmit, header }: WrapperProps) => {
  return (
    <>
      <h3 className="text-center mb-3 text-xl">{header}</h3>
      <form
        className="flex flex-col gap-5 text-right w-[302px] mx-auto"
        onSubmit={onSubmit}
      >
        {children}
        <input
          type="submit"
          value="Submit"
          className="bg-slate-900 mx-auto w-[102px] py-1.5 rounded cursor-pointer relative right-[9px]"
        />
      </form>
    </>
  );
};

export default Wrapper;
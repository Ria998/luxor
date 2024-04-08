import Image from "next/image";

interface LoadingProps {
  width: number;
  height: number;
  className?: string;
}

export const Loading = ({ width, height, className }: LoadingProps) => {
  return (
    <div>
      <Image
        src="/loading.svg"
        alt="loading"
        width={width}
        height={height}
        className={`${className} animate-spin`}
        priority
      />
    </div>
  );
};

export default Loading;

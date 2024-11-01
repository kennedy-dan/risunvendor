import { Exclamation } from "@/public/svgs/icons";

export default function Info({ message }) {
  return (
    <span className="text-[2rem] text-center mx-auto my-40 w-4/6 flex flex-col items-center">
      <Exclamation className="w-12 h-12 cursor-default" />
      {message || "No message, set message"}
    </span>
  );
}

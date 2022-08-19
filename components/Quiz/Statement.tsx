import Emitter from "@/utils/emiiter";

type Statement = {
  text: string;
  event:string
};

export default function Statement({ text,event }: Statement) {
  return (
    <>
      <div className='px-3'
        onClick={() => Emitter.emit(event, "")}>
        <p>{text}</p>
      </div>
    </>
  );
}

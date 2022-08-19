import Emitter from "@/utils/emiiter";

type Statement = {
  text: string;
  event:string;
  id:string;
};

export default function Statement({ text,event,id }: Statement) {
  return (
    <>
      <div className='px-3'
        onClick={() => Emitter.emit(event, id)}>
        <p>{text}</p>
      </div>
    </>
  );
}

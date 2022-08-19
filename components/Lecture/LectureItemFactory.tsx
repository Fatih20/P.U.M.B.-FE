import YoutubeEmbed from "@/components/Lecture/YoutubeEmbed";
import FileDownloadButton from "@/components/Lecture/FileDownloadButton";
import ImageLecture from "@/components/Lecture/ImageLecture";

type Item = {
  id: any;
  type: string;
  name: string;
  url: string;
};

export default function LectureItemFactory({
  Items,
  editable,
}: {
  Items: any;
  editable: boolean;
}) {
  return (
    <>
      {Items.map((item: Item) => {
        // Video
        if (item.type == "VIDEO") {
          return (
            <YoutubeEmbed
              key={item.id.toString()}
              id={item.id}
              url={item.url}
              editable={editable}
            />
          );
        } else if (item.type == "DOCUMENT") {
          return (
            <FileDownloadButton
              key={item.id.toString()}
              name={item.name}
              url={item.url}
            />
          );
        } else if (item.type == "IMAGE") {
          return (
            <div
              key={item.id.toString()}
              className='rounded overflow-hidden shadow-lg p-3 bg-white'
            >
              <ImageLecture name={item.name} imgUrl={item.url} />
            </div>
          );
        }
      })}
    </>
  );
}

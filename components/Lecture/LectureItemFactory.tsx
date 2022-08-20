import YoutubeEmbed from "@/components/Lecture/YoutubeEmbed";
import FileDownloadButton from "@/components/Lecture/FileDownloadButton";
import ImageLecture from "@/components/Lecture/ImageLecture";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteLectureItem } from "@/utils/api/lecture";

type Item = {
  id: any;
  type: string;
  name: string;
  url: string;
};

export default function LectureItemFactory({
  Items,
  editable,
  queryName,
}: {
  Items: any;
  editable: boolean;
  queryName: string;
}) {
  const queryClient = useQueryClient();
  const { mutateAsync: handleDeleteObject } = useMutation(
    async (id) => await deleteLectureItem(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryName);
      },
    }
  );

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
              handleDeleteObject={handleDeleteObject}
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

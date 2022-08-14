

export default function ImageLecture({imgUrl}: {imgUrl:string}) {
    return (
        <>
         <div className="max-w-sm rounded overflow-hidden shadow-lg p-3 bg-white">
            <img src={imgUrl} alt="" />
        </div>
        </>
    )
}




export default function ImageLecture({imgUrl,name}: {imgUrl:string,name:string}) {
    return (
        <>
            <img className="w-full" src={imgUrl} alt={name} />
        </>
    )
}


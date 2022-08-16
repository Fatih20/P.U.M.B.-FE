

export default function ImageLecture({imgUrl,name}: {imgUrl:string,name:string}) {
    return (
        <>
            <img src={imgUrl} alt={name} />
        </>
    )
}


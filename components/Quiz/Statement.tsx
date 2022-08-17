
type Statement = {
    text: string
}

export default function Statement({ text }: Statement) {

    return (
        <>
            <div className="px-3">
                {text}
            </div>
        </>
    )
}


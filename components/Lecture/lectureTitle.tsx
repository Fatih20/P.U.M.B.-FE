import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { patchLectureTitle } from "../../pages/api/lectureAPI"
import { LectureTitlePatch } from "../../types/TypesForUs";
import { useRouter } from 'next/router'
import { getLectureById } from '../../pages/api/lectureAPI'

type FormInput = {
    titleForm: string,
}

export default function LectureTitleForm() {
    // Initiate Router
    const router = useRouter()
    const { lectureId } = router.query

    // Initiate State
    const [title, setTitle] = useState({ text: "", visibility: true, id: null });
    const [form, setForm] = useState({ text: "", visibility: false });

    // Fetching data
    useEffect(() => {
        if (lectureId && title.id == null) {
            getLectureById(lectureId).then((data) => {
                console.log(data);
                setTitle({ ...title, id: data.result.data.id, visibility: true, text: data.result.data.title })
            })
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInput>();

    const transformToForm = () => {
        setTitle({ ...title, visibility: false })
        setForm({ ...form, visibility: true })
    }

    const handleTitleSubmit: SubmitHandler<FormInput> = (data) => {

        const payload: LectureTitlePatch = {
            title: data.titleForm
        }

        // PATCH Lecture with id
        patchLectureTitle(lectureId, payload).then((data) => {
            console.log(data);
            setTitle({ ...title, text: data.result.data.title, visibility: true, id: data.result.data.id })
            setForm({ ...form, visibility: false })
        })

    }

    return (
        <>
            {/* Title */}
            {title.visibility &&
                <h1 className="text-2xl text-bold" onClick={() => transformToForm()}>{title.text}</h1>
            }

            {/* Form */}
            {form.visibility &&
                <form className="rounded shadow-lg bg-white" onSubmit={handleSubmit(handleTitleSubmit)}>
                    <div className="mb-6">
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("titleForm", { required: true })}

                            defaultValue={title.text}
                            placeholder={title.text} />
                    </div>
                    {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button> */}
                </form>
            }

        </>
    )
}




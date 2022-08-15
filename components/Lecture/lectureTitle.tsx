import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { text } from "stream/consumers";
import { postLectureTitle } from "../../pages/api/lectureAPI"
import { LectureTitleType } from "../../types/TypesForUs";

type FormInput = {
    titleForm: string,
}

export default function LectureTitle() {
    const [title, setTitle] = useState({ text: "Lecture Title", visibility: true, id:null });
    const [form, setForm] = useState({ text: "", visibility: false });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormInput>();

    const transformToForm = () => {
        setTitle({ ...title, visibility: !title.visibility })
        setForm({ ...form, visibility: !form.visibility })
    }

    const handleTitleSubmit: SubmitHandler<FormInput> = (data) => {
    
        const payload:LectureTitleType = {
            title:data.titleForm,
            course_id : 1
        }

        // check if lecture data already created
        if(title.id == null){
            // POST new Lecture
            const resp = postLectureTitle(payload)
            resp.then((data) => {
                console.log(data);
                console.log(data.result.data);
                setTitle({ ...title, id:data.result.data.id, visibility:true, text:data.result.data.title})
                setForm({ ...form, visibility:false })

            })
        }else{
            // PATCH Lecture with id
            alert("you need edit instead of create new")
        }

        // setTitle({ ...title, text: data.titleForm, visibility:true })
        
    }

    return (
        <>
            {/* Title */}
            {title.visibility &&
                <h1 className="text-2xl text-bold" onClick={() => transformToForm()}>{title.text}</h1>
            }

            {/* Form */}
            {form.visibility &&
                <form onSubmit={handleSubmit(handleTitleSubmit)}>
                    <div className="mb-6">
                        {/* <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label> */}
                        {/* <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue={title.text}
                            onChange={event => handleChange(event.target.value)}
                            placeholder="Lecture Title" required /> */}

                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("titleForm", { required: true })}

                            defaultValue={title.text}
                            placeholder={title.text} />



                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </form>
            }

        </>
    )
}


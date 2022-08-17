
export default function QuizEdit() {
    return (
        <>
            <div className="max-w-sm rounded overflow-hidden  shadow-lg p-3">
                <div className="space-y-3">
                    {/* Question Form */}
                    <form className="rounded  bg-white">
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            // {...register("title", { required: true })}
                            // defaultValue={text}
                            placeholder="question.." />
                    </form>

                    <div className="ml-5 space-y-3">

                        {/* Answer Radio */}
                        <form >
                            <div className="flex items-center mb-4">
                                <input id="default-radio-1" type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="default-radio-1" className="ml-2 text-sm  text-gray-900 dark:text-gray-300">Default radio</label>
                            </div>
                            <div className="flex items-center">
                                <input defaultChecked id="default-radio-2" type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="default-radio-2" className="ml-2 text-sm  text-gray-900 dark:text-gray-300">Checked state</label>
                            </div>
                        </form>

                        {/* Add Answer Button */}
                        <button className="text-sm">
                            {/* <a href="#" className=""></a> */}
                            + Add Answer
                        </button>
                    </div>

                    {/* Feedback Form */}
                    <form className="rounded  bg-white">
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            // {...register("title", { required: true })}
                            // defaultValue={text}
                            placeholder="feedback.." />
                    </form>

                </div>
            </div>

        </>
    )
}

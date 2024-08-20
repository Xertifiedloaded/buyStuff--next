
import FormComponent from "@/component/FormComponent";
import { useAuth } from "@/DashBoard/AuthContext";
import { useState } from "react";
import bg from '../../../assets/image.jpeg'

const CreateUser = () => {
    const styleName = 'w-full bg-blue-500 outline-none  bg-black text-white  border border-black py-3 mt-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
    const { create } = useAuth()
    const [payload, setPayload] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [error, setError] = useState(null)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError(null)
            await create(payload)

        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <>
            <section className="lg:grid   xs:block  h-screen lg:grid-cols-2  ">
                <div className="bg xs:hidden lg:block"  />
                <div className="bgImage lg:p-10 xs:p-4 xs:grid xs:items-center lg:block   xs:h-screen lg:h-full">
                    <FormComponent text='Signup' handleSubmit={handleSubmit} error={error} payload={payload} styleName={styleName} title='SignUp' handleChange={handleChange} />
                </div>

            </section>
        </>
    )
}

export default CreateUser
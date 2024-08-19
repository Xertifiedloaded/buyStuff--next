import FormComponent from "@/component/FormComponent";
import { useAuth } from "@/DashBoard/AuthContext";
import { useState } from "react";


const CreateUser = () => {
    const styleName = 'w-full bg-blue-500 text-black border border-black py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
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
        // console.log(payload);
        try {
            setError(null)
            await create(payload)

        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <FormComponent text='Signup' handleSubmit={handleSubmit} error={error} payload={payload} styleName={styleName} title='SignUp' handleChange={handleChange} />
    )
}

export default CreateUser
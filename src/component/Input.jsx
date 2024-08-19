// Input.js
export function Input({ payload, handleChange }) {
    return (
        <>
            {["name", "email", "password", "passwordConfirm"].map((field, idx) => (
                <div key={idx} className="flex flex-col mb-3">
                    <label className="text-sm mb-1" htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <input
                        type={field.includes('password') ? 'password' : 'text'}
                        id={field}
                        name={field}
                        className="p-3 h-[45px] placeholder:text-sm text-[16px] rounded-md border border-gray-300 w-full outline-none"
                        value={payload[field]}
                        onChange={handleChange}
                        placeholder={`Enter your ${field}`}
                        required
                    />
                </div>
            ))}
        </>
    );
}
export function LoginInput({ payload, handleChange }) {
    return (
        <>
            {[ "email", "password"].map((field, idx) => (
                <div key={idx} className="flex flex-col mb-3">
                    <label className="text-sm mb-1" htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <input
                        type={field.includes('password') ? 'password' : 'text'}
                        id={field}
                        name={field}
                        className="p-3 h-[45px] placeholder:text-sm text-[16px] rounded-md border border-gray-300 w-full outline-none"
                        value={payload[field]}
                        onChange={handleChange}
                        placeholder={`Enter your ${field}`}
                        required
                    />
                </div>
            ))}
        </>
    );
}
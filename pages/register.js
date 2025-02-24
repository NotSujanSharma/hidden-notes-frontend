import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { register } from '../utils/api';

export default function Register() {
    const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            await register(data.email, data.password);
            alert('Registered successfully. Please verify your email.');
            router.push('/login');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        (<div className="min-h-screen flex justify-center items-center dark:bg-gray-800">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">Register</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        {...formRegister('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                        className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Password</label>
                    <input
                        type="password"
                        {...formRegister('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
                        className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Register</button>
            </form>
        </div>)
    );
}
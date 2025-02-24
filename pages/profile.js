import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'next/router';
import { changePassword } from '../utils/api';

export default function Profile() {
    const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    if (!token) {
        router.push('/login');
        return null;
    }

    const onSubmit = async (data) => {
        try {
            await changePassword(data.currentPassword, data.newPassword);
            alert('Password changed successfully');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="p-8 dark:bg-gray-800">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Change Password</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Current Password</label>
                    <input
                        type="password"
                        {...formRegister('currentPassword', { required: 'Current password is required' })}
                        className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
                    />
                    {errors.currentPassword && <p className="text-red-500">{errors.currentPassword.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">New Password</label>
                    <input
                        type="password"
                        {...formRegister('newPassword', {
                            required: 'New password is required',
                            minLength: { value: 8, message: 'Password must be at least 8 characters' },
                        })}
                        className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
                    />
                    {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Change Password</button>
            </form>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">Logout</button>
        </div>
    );
}
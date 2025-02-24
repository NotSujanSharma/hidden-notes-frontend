import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import { submitMessage } from '../../utils/api';
import Head from 'next/head';

export default function SubmitMessage() {
    const router = useRouter();
    const { link_id } = router.query;
    const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
    const [captcha, setCaptcha] = useState(null);

    const onSubmit = async (data) => {
        if (!captcha) {
            alert('Please complete the CAPTCHA');
            return;
        }
        try {
            await submitMessage(link_id, data.content, data.category, captcha);
            alert('Message submitted successfully');
            router.push('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <Head>
                <title>Send an Anonymous Message</title>
                <meta name="description" content="Send an anonymous message to someone." />
            </Head>
            <div className="min-h-screen flex justify-center items-center dark:bg-gray-800">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 dark:text-white">Send an Anonymous Message</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Message</label>
                        <textarea
                            {...formRegister('content', {
                                required: 'Message is required',
                                maxLength: { value: 1000, message: 'Message too long' },
                            })}
                            className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
                            rows="5"
                        />
                        {errors.content && <p className="text-red-500">{errors.content.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Category</label>
                        <select
                            {...formRegister('category', { required: 'Category is required' })}
                            className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
                        >
                            <option value="">Select a category</option>
                            <option value="Feedback">Feedback</option>
                            <option value="Question">Question</option>
                            <option value="Compliment">Compliment</option>
                        </select>
                        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                    </div>
                    <div className="mb-4">
                        <ReCAPTCHA sitekey="your_site_key" onChange={(value) => setCaptcha(value)} />
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Submit</button>
                </form>
            </div>
        </>
    );
}
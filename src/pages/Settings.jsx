import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Settings = () => {
    const formik = useFormik({
        initialValues: {
            firstName: 'John',
            lastName: 'Smith',
            email: 'john.smith@example.com',
            phone: '+1 (555) 123-4567',
            notifications: {
                email: true,
                sms: false,
                promotions: true
            },
            theme: 'system'
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            phone: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up px-4 py-8">
            <header className="mb-8 border-b border-gray-100 dark:border-gray-700 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your profile and preferences.</p>
            </header>

            <form onSubmit={formik.handleSubmit} className="space-y-8">
                {/* Profile Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                            <input
                                type="text"
                                {...formik.getFieldProps('firstName')}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white transition-all"
                            />
                            {formik.touched.firstName && formik.errors.firstName && <div className="text-red-500 text-xs mt-1">{formik.errors.firstName}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                            <input
                                type="text"
                                {...formik.getFieldProps('lastName')}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white transition-all"
                            />
                            {formik.touched.lastName && formik.errors.lastName && <div className="text-red-500 text-xs mt-1">{formik.errors.lastName}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                {...formik.getFieldProps('email')}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white transition-all"
                            />
                            {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                            <input
                                type="text"
                                {...formik.getFieldProps('phone')}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white transition-all"
                            />
                            {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>}
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h2>
                    <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">Email Notifications</p>
                                    <p className="text-xs text-gray-500 text-left">Receive booking updates via email</p>
                                </div>
                            </div>
                            <div className="relative">
                                <input type="checkbox" {...formik.getFieldProps('notifications.email')} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </div>
                        </label>

                        <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">SMS Notifications</p>
                                    <p className="text-xs text-gray-500 text-left">Receive booking reminders via text</p>
                                </div>
                            </div>
                            <div className="relative">
                                <input type="checkbox" {...formik.getFieldProps('notifications.sms')} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary-200 transition-all transform active:scale-95"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;

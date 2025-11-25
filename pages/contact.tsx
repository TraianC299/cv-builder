// app/contact/page.tsx
'use client';

import AutosizeInput from '@/components/ui/input/AutosizeInput';
import Input from '@/components/ui/input/Input';
import { PageSEO } from '@/components/utilities/SEO';
import { Button } from '@/styles/global';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

export default function ContactPage() {
    const { t } = useTranslation('contact');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);


    return (
        <>
            <PageSEO
                title={t('meta-title')}
                description={t('meta-description')}
            />
            <main className="min-h-screen  flex items-center justify-center px-4">
                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">{t('title')}</h1>

                    {submitted ? (
                        <div className="text-green-600 font-medium">{t('successMessage')}</div>
                    ) : (
                        <form className="space-y-5">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                label={t('emailLabel')}
                                placeholder={t('emailLabel')}
                                value={email}
                                setValue={setEmail}
                            />

                            <AutosizeInput
                                id="message"
                                name="message"
                                required
                                label={t('messageLabel')}
                                placeholder={t('messageLabel')}
                                value={message}
                                setValue={setMessage}
                                className="w-full h-32 resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-3"
                            />

                            <Button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // You can integrate with your API here
                                    console.log({ email, message });

                                    // Fake submission state
                                    setSubmitted(true);
                                    setEmail('');
                                    setMessage('');
                                }}
                                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 rounded-xl transition"
                            >{t('submitButton')}</Button>
                        </form>
                    )}
                </div>
            </main>
        </>
    );
}


export const getStaticProps = async ({ locale }: {
    locale: string;
}) => {

    return {
        props: {
            ...(await serverSideTranslations(locale, ["contact", "common"])),
        },
    };
};
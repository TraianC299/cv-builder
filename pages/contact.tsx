// app/contact/page.tsx
"use client";

import H2Tag from "@/components/other/H2Tag";
import SectionSubtitle from "@/components/other/SectionSubtitle";
import { PageSEO } from "@/components/other/SEO";
import { AutoHeightTextarea } from "@/components/ui/auto-height-textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";

const submitContact = async (email: string, message: string, name?: string) => {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: 'CONTACT', email, message, name }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Failed to send message");
};

export default function ContactPage() {
  const { t } = useTranslation("contact");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitContact(email, message);
    setSubmitted(true);
    setEmail("");
    setMessage("");
  }

  return (
    <>
      <PageSEO title={t("meta-title")} description={t("meta-description")} />
      <main className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="mt-4 text-base text-blackgrey">
          <a href="mailto:contact@resumelio.com" className="text-maincolor hover:underline">
            contact@resumelio.com
          </a>
        </p>
        <H2Tag>{t("title")}</H2Tag>
        <SectionSubtitle>{t("meta-description")}</SectionSubtitle>


        <div className="my-10 h-px bg-bordercolor" />

        {submitted ? (
          <div className="text-base font-medium text-green">
            {t("successMessage")}
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Field>
              <FieldLabel>{t("emailLabel")}</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder={t("emailLabel")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>{t("messageLabel")}</FieldLabel>
              <AutoHeightTextarea
                id="message"
                name="message"
                required
                placeholder={t("messageLabel")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-36 w-full resize-none"
              />
            </Field>

            <Button type="submit">{t("submitButton")}</Button>
          </form>
        )}
      </main>
    </>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["contact", "common"])),
    },
  };
};

// app/contact/page.tsx
"use client";

import { ContactInput } from "../../types/contactInput";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "../../styles/Contact.module.css";

const Contact = () => {
  const [form, setForm] = useState<ContactInput>({
    name: "",
    email: "",
    message: "",
  });

  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [messageError, setMessageError] = useState<string>("");

  const [isSending, setIsSending] = useState<boolean>(false);

  const handleForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const valid = () => {
    let isValid = true;
    let nameError = "";
    if (form.name === "") {
      nameError = "入力してください";
      isValid = false;
    } else if (form.name.length > 30) {
      nameError = "30文字以内で入力してください";
      isValid = false;
    }
    setNameError(nameError);

    let emailError = "";
    if (form.email === "") {
      emailError = "入力してください";
      isValid = false;
    } else if (!form.email.match(/^[\w\-.]+@[\w\-.]+\.[a-zA-Z]{2,}$/)) {
      emailError = "メールアドレスの形式が不正です";
      isValid = false;
    }
    setEmailError(emailError);

    let messageError = "";
    if (form.message === "") {
      messageError = "入力してください";
      isValid = false;
    } else if (form.message.length > 500) {
      messageError = "500文字以内で入力してください";
      isValid = false;
    }
    setMessageError(messageError);

    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!valid()) return;

    setIsSending(true);
    try {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) {
        throw new Error("送信に失敗しました");
      }
      alert("送信しました");
      console.log("送信データ:", form);
      handleClear();
    } catch (error) {
      console.error("エラー内容:", error);
      alert("送信に失敗しました");
    } finally {
      setIsSending(false);
    }
  };

  const handleClear = () => {
    setForm({
      name: "",
      email: "",
      message: "",
    });
    setNameError("");
    setEmailError("");
    setMessageError("");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.Container}>
        <h1 className={styles.title}>問合わせフォーム</h1>
        <div className={styles.formGroup}>
          <label htmlFor="name">お名前</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleForm}
            value={form.name}
            disabled={isSending}
          />
          <p style={{ color: "red" }}>{nameError}</p>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleForm}
            value={form.email}
            disabled={isSending}
          />
          <p style={{ color: "red" }}>{emailError}</p>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">本文</label>
          <textarea
            className={styles.textarea}
            id="message"
            name="message"
            onChange={handleForm}
            value={form.message}
            disabled={isSending}
          />
        </div>
        <p style={{ color: "red" }}>{messageError}</p>
        <div>
          <button type="submit" disabled={isSending}>
            送信
          </button>
          <button type="button" onClick={handleClear} disabled={isSending}>
            クリア
          </button>
        </div>
      </div>
    </form>
  );
};

export default Contact;

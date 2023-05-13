"use client";

import { useForm } from "react-hook-form";

type formValue = {
  message: string;
  subject: string;
};

function Section() {
  const { handleSubmit, register } = useForm<formValue>({
    defaultValues: { subject: "I want to use isave api" },
  });

  const onSubmit = (value: formValue) => {
    console.log(value.message);
    const mail = `mailto:raghavancool24@gmail.com?subject=${value.subject}&body=${value.message}`;

    window.location.href = mail;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mt-4"
    >
      <label htmlFor="subject">Subject</label>
      <input
        {...register("subject")}
        id="subject"
        placeholder="write subject"
        className="p-2 border-2 border-black rounded-lg outline-none"
      />

      <label htmlFor="body">Body</label>
      <textarea
        placeholder="Write message"
        {...register("message")}
        id="body"
        className="p-2 border-2 outline-none border-black rounded-lg resize-none h-56"
      />

      <div className="flex justify-end">
        <button className="flex gap-2 rounded-lg  p-2 bg-black text-white items-center">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          Send
        </button>
      </div>
    </form>
  );
}

export default Section;

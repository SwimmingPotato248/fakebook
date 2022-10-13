import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UploadAvatar } from "../../components/UploadAvatar";
import { trpc } from "../../utils/trpc";

type FormValues = {
  fName: string;
  lName: string;
  dateOfBirth: Date;
  bio: string;
};

export default function CreateProfile() {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();

  const [image, setImage] = useState<string>("");
  const { mutate } = trpc.useMutation(["profile.create"], {
    onSuccess: () => {
      router.push("/profile");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    mutate({ ...data, image });
  };

  return (
    <form
      className="mx-auto flex w-1/2 max-w-lg flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Create Profile</h2>
      <label className="flex flex-col">
        First Name*
        <input
          type="text"
          required
          placeholder="First Name"
          className="rounded-lg border border-black p-1"
          {...register("fName", { required: true })}
        />
      </label>
      <label className="flex flex-col">
        Last Name*
        <input
          type="text"
          required
          placeholder="Last Name"
          className="rounded-lg border border-black p-1"
          {...register("lName", { required: true })}
        />
      </label>
      <label className="flex flex-col">
        Date of birth*
        <input
          type="date"
          required
          className="rounded-lg border border-black p-1"
          max={new Date().toISOString().split("T")[0]}
          {...register("dateOfBirth", { required: true, valueAsDate: true })}
        />
      </label>
      <label className="flex flex-col">
        Bio
        <textarea
          className="resize-none rounded-lg border border-black p-1"
          rows={4}
          {...register("bio", { required: true })}
        />
      </label>
      <UploadAvatar image={image} setImage={setImage} />
      <input
        type="submit"
        value="Create Profile"
        className="mt-2 cursor-pointer rounded-lg bg-blue-600 py-1"
      />
    </form>
  );
}

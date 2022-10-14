import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { UploadAvatar } from "./UploadAvatar";

type FormValues = {
  fName: string;
  lName: string;
  dateOfBirth: Date;
  bio: string;
};

type ProfileFormProps = {
  defautValues?: Partial<FormValues & { image: string | null }>;
  edit?: boolean;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ defautValues, edit }) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();

  const [image, setImage] = useState<string>(defautValues?.image || "");
  const { mutate } = trpc.useMutation([`profile.${edit ? "edit" : "create"}`], {
    onSuccess: () => {
      router.push("/profile/me");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    mutate({ ...data, image });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <h2>{edit ? "Edit" : "Create"} Profile</h2>
      <label className="flex flex-col">
        First Name*
        <input
          type="text"
          required
          placeholder="First Name"
          className="rounded-lg border border-black p-1"
          defaultValue={defautValues?.fName}
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
          defaultValue={defautValues?.lName}
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
          defaultValue={defautValues?.dateOfBirth?.toISOString().split("T")[0]}
          {...register("dateOfBirth", { required: true, valueAsDate: true })}
        />
      </label>
      <label className="flex flex-col">
        Bio
        <textarea
          className="resize-none rounded-lg border border-black p-1"
          rows={4}
          defaultValue={defautValues?.bio}
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
};

export default ProfileForm;

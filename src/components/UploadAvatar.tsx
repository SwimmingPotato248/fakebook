import { nanoid } from "nanoid";
import Image from "next/future/image";
import { ChangeEventHandler, Dispatch, SetStateAction, useRef } from "react";
import { env } from "../env/client.mjs";
import { supabase } from "../utils/supabaseClient";

type UploadAvatarProps = {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
};

export const UploadAvatar: React.FC<UploadAvatarProps> = ({
  image,
  setImage,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = async e => {
    try {
      if (
        !e.target.files ||
        e.target.files.length === 0 ||
        !e.target.files[0]
      ) {
        return;
      }
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${nanoid()}.${fileExt}`;
      const filePath = `${fileName}`;
      const { data, error } = await supabase.storage
        .from("fakebook")
        .upload(filePath, file);
      if (error) throw new Error("Something went wrong");
      const path = `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/fakebook/${data.path}`;
      setImage(path);
    } catch {
      return;
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-grow-0 items-center">
      <label>
        Upload avatar
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleChange}
          hidden
        />
      </label>
      <div className="relative flex flex-1 flex-col items-center justify-center">
        <Image
          src={image !== "" ? image : "/avatar-placeholder.webp"}
          alt="Preview"
          height={100}
          width={100}
        />
        Preview Avatar
      </div>
    </div>
  );
};

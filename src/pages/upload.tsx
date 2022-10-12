import { useRef } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Upload() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={async e => {
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
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;
            await supabase.storage.from("fakebook").upload(filePath, file);
          } catch {
            return;
          }
        }}
      />
    </form>
  );
}

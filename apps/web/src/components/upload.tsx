import Spinner from "@workspace/ui/components/spinner";
import { Input } from "@workspace/ui/components/input";
import React, { useRef, useState } from "react";
import { toast } from "@workspace/ui/hooks/use-toast";
import { upload_file } from "@/lib/axios";

export interface UploadPropsType {
  folder?: string;
  onImageUpload: (...event: any[]) => void;
}

export default function Upload({
  folder = "VPR",
  onImageUpload,
}: UploadPropsType) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [is_loading, set_is_loading] = useState<boolean>(false);

  const handle_input_click = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const handle_file_change = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // check if file is selected and the size is lest than 2 MB
    if (event.target.files && event.target.files[0].size > 2000000) {
      toast({
        title: "Oops! Error occurred",
        description: "File size should be less than 1 MB",
      });
      return;
    }

    if (event.target.files && event.target.files.length > 0) {
      set_is_loading(true);
      const res = await upload_file("/upload", event.target.files[0], folder);
      set_is_loading(false);
      if (res?.success) {
        onImageUpload(res.data);
        toast({
          title: "Uploaded!",
          description: "File uploaded successfully",
        });
      } else {
        console.log("err", res);
        toast({
          title: "Oops! Error occurred",
          description: res?.error,
        });
      }
    }
  };
  return (
    <div className="relative">
      <Input
        ref={inputFileRef}
        type="file"
        onChange={handle_file_change}
        onClick={handle_input_click}
        disabled={is_loading}
      />
      <div className="absolute top-[5px] right-[8px]">
        <Spinner isLoading={is_loading} />
      </div>
    </div>
  );
}

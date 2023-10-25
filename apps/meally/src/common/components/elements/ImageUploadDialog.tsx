"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Loader2, UploadIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { UploadDropzone } from "@lib/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { Button } from "../ui/button";
import { UploadFileResponse } from "uploadthing/client";

interface ImageUploadDialogProps {
  title: string;
  Trigger?: React.ReactNode;
  noTrigger?: boolean;
  description?: string;
  externalOpen?: boolean;
  setExternalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setImage?: (images: UploadFileResponse[]) => any;
  children?: React.ReactNode;
}

const ImageUploadDialog = ({
  title,
  description,
  Trigger,
  noTrigger = false,
  externalOpen,
  setExternalOpen,
  setImage,
  children,
}: ImageUploadDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  const open = externalOpen || internalOpen;
  const setOpen = setExternalOpen || setInternalOpen;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {Trigger && !noTrigger ? (
        Trigger
      ) : (
        <DialogTrigger className="flex flex-row gap-1 border-none outline-none">
          <UploadIcon /> Upload an Image
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div>
          <UploadDropzone
            endpoint="imageUploader"
            onUploadBegin={() => setLoading(true)}
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res?.map((file) => file.url));
              setImage && res && setImage(res);

              setLoading(false);
              toast({
                title: "Image uploaded!",
                description: "Your image has been uploaded successfully.",
              });
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              setLoading(false);
              toast({
                title: "Error uploading image",
                description: error.message,
                variant: "destructive",
              });
              console.error(error);
            }}
          />
          {children}
        </div>
        <DialogFooter>
          <Button
            ariaLabel="cancel"
            variant={"destructive"}
            type="button"
            className="m-2 w-52"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            ariaLabel="save"
            type="button"
            className="m-2 w-52"
            onClick={() => setOpen(false)}
          >
            Save
            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;

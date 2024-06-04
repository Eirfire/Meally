"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/advanced-components/input";
import { createRecipeSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { env } from "env";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import FeedbackDialog from "../modals/feedback-modal";
import { createRecipeOpen } from "../providers/dialogs";
import { userDropDownOpen } from "../providers/state-provider";
import VersionChip from "../versioning-chips";
import { createRecipeFromImage } from "@/actions/recipe-imports/image";
import { useAction } from "next-safe-action/hooks";

const CreateRecipeDialog = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useAtom(createRecipeOpen);
  const [, setUserDropDownOpen] = useAtom(userDropDownOpen);
  const [base64String, setBase64String] = useState<string>();
  const [files, setFiles] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setBase64String(
          reader.result?.toString().replace(/^data:image\/[a-z]+;base64,/, "")
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const setInfo = useAction(createRecipeFromImage, {
    onError: (e) => {
      console.error("Error setting info: ", e);
      toast.error("Something went wrong pleaase try again.");
    },
    onSuccess: (data) => {
      console.log("return result", data);
    },
  });

  const methods = useForm<z.infer<typeof createRecipeSchema>>({
    resolver: zodResolver(createRecipeSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<z.infer<typeof createRecipeSchema>> = (
    values
  ) => {
    setLoading(true);
    const createRecipe = fetch("/api/recipes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
      },
      body: JSON.stringify({ title: values.title, link: values.link }),
    });

    toast.promise(createRecipe, {
      loading: "Creating Recipe...",
      success: (data) => {
        if (data.status === 200) {
          data.json().then((data) => {
            setLoading(false);
            setUserDropDownOpen(false);
            setOpen(false);
            router.push(`/recipes/preview/${data.id}/edit`);
          });
        }

        return "Recipe Created";
      },
      error: (err) => {
        setLoading(false);
        setOpen(false);
        console.error(err);
        return "Error while creating recipe";
      },
    });
  };

  useEffect(() => {
    if (!open) {
      methods.reset();
      setLoading(false);
    }
  }, [open, methods]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger className="flex flex-row gap-1 border-none outline-none">
        <PlusCircleIcon /> Create a recipe
      </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new recipe</DialogTitle>
          <DialogDescription>
            All you need is either your recipes name or a link to an existing
            recipe
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            {...register("title")}
            label="Title"
            autoFocus={false}
            error={errors.title}
          />

          <p className="mx-auto">OR</p>

          <div>
            <div className="flex flex-row items-center gap-4">
              import a recipe <VersionChip release="beta" />
            </div>
            <Input
              {...register("link")}
              error={errors.link}
              autoFocus={false}
              label="Recipe Url"
              placeholder="https://"
            />
          </div>
          <Button
            type="submit"
            aria-label="continue with creating the recipe"
            className={buttonVariants({
              className: "items-center font-semibold",
            })}
            disabled={loading}
          >
            Create Recipe
            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>

        <div>
          Upload image
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <Button
            type="button"
            onClick={() => {
              console.log("Base64string: ", base64String);
              setInfo.execute({ image: base64String as string });
            }}
          >
            Create Recipe from Image
          </Button>
        </div>

        <FeedbackDialog />
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeDialog;
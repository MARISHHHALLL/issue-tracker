"use client";
import { Button, TextField, Callout } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import Spinner from "@/components/spinner";
interface FormProps {
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<FormProps>();
  const router = useRouter();
  const [handleError, setHandleError] = useState<string>("");
  const [submited, setSubmited] = useState(false);
  return (
    <div className="max-w-xl space-y-3">
      {handleError && (
        <Callout.Root color="red">
          <Callout.Icon>
            <AiFillAlert height={20} width={20} />
          </Callout.Icon>
          <Callout.Text>{handleError}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3 "
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmited(true);
            await axios.post("/api/issue", data);
            router.push("/issues");
          } catch (error) {
            setSubmited(false);
            setHandleError("an expected error, please try again!");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button disabled={submited}>New Issue {submited && <Spinner />}</Button>
      </form>
    </div>
  );
};
export default NewIssuePage;

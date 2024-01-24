"use client";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const DeleteBtn = (id) => {
  const router = useRouter();
  async function deleteStudentData(id) {
    try {
      let confirm = window.confirm(
        "Are you sure you want to delete this student?"
      );
      if (confirm) {
        const res = await fetch(`/api/v1/user?id=${id.id}`, {
          method: "DELETE",
          cache: "no-store",
        });
        const data = await res.json();
        if (data["status"] === "success") {
          toast.success(data["message"]);
          router.refresh();
        } else {
          toast.error(data["message"]);
        }
      }
    } catch (e) {
      toast.error(e);
    }
  }
  return (
    <>
      <button
        onClick={async () => {
          await deleteStudentData(id);
        }}
      >
        delete
      </button>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default DeleteBtn;

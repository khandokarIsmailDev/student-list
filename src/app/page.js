import StudentList from "@/components/StudentLists/StudentList";




const page = async () => {
  return (
    <main className="flex min-h-screen flex-col px-2">
      <StudentList  />
    </main>
  );
};

export default page;

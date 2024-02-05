import StudentList from "@/components/StudentLists/StudentList";

export  let revalidate = 0

async function getStudentData() {
  try {
    const res = await fetch(`${process.env.HOST}/api/v1/user`, {next:{revalidate:1}});
    const data = await res.json();
    return data["data"];
  } catch (e) {
    console.log(e);
  }
  } 


const page = async () => {
  let data = await getStudentData()
  // console.log(data)
  return (
    <main className="flex min-h-screen flex-col px-2">
      <StudentList   />
    </main>
  );
};

export default page;

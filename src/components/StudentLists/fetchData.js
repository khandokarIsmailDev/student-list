 export  const revalidate = 0

export default async function getStudentData() {
  try {
    const res = await fetch("/api/v1/user", { cache: 'no-store' });
    const data = await res.json();
    return data["data"];
  } catch (e) {
    console.log(e);
  }
} 
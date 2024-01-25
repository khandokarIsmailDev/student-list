

export default async function getStudentData() {
    try {
      const res = await fetch("http://localhost:3001/api/v1/user", {
        cache:"no-cache"
      });
      const data = await res.json();
      return data["data"];
    } catch (e) {
      console.log(e);
    }
  }
  
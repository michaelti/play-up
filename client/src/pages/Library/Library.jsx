import useAxios from "../../hooks/useAxios";
import useAxiosPost from "../../hooks/useAxiosPost";

export default function Library() {
  const [data, loading, error] = useAxios("/games");
  const [postData, postLoading, postError, postDataFn] = useAxiosPost("/games");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      Library
      <button
        onClick={() =>
          postDataFn({
            name: "Test",
            imageUrl: "/images/8eb517e8-dcb2-4464-8e9d-9be6050abf6a.jpg",
          })
        }
      >
        Upload
      </button>
    </div>
  );
}

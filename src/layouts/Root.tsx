import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { self } from "../http/api";
import { useEffect } from "react";
import { useAuthStore } from "../store";
import { AxiosError } from "axios";

const getSelf = async () => {
    const data = await self();
    return data
}

const Root = () => {
  const { setUser } = useAuthStore()
  const { data, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf, // এই function call fail হলে retry হবে
    retry: (failurCount: number, error) => {
        if(error instanceof AxiosError && error.response?.status===401) {
            return false
        }
        return failurCount < 3
    } // Retry মানে হলো যদি কোন API call fail হয়, তাহলে সেই same API call আবার করা।
  }); 

  useEffect(() => {
    if(data) {
        setUser(data)
    }
  }, [data, setUser])

  if(isLoading) {
    return <div>Loading...</div>
  }

  return <Outlet />;
};

export default Root;

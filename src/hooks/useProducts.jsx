"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/products");
      return res.data;
    },
  });
};

export default useProduct;
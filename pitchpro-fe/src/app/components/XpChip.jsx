"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchXp } from "@/redux/features/xp/XpSlice";
export default function XpChip({ children }) {
  const dispatch = useDispatch();
  const xp = useSelector((state) => state.xp.value);
  const loading = useSelector((state) => state.xp.loading);

  useEffect(() => {
    dispatch(fetchXp());
  }, [dispatch]);

  return (
    <>
      <div className="rounded-full w-fit bg-tertiary-50 py-2 px-3 text-tertiary-700 font-semibold text-title">⭐ {loading ? "..." : xp}</div>
    </>
  );
}

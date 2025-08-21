// hooks/useAdminSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addSubmission, updateSubmissionStatus } from "@/Redux/Slice/SubmissionSlice";


export const useAdminSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      auth: { token:localStorage.getItem('userToken') }, // JWT
    });

    socket.on("connect", () => {
      console.log("✅ Admin connected via socket:", socket.id);
    });

    socket.on("submission:new", (submission) => {
      console.log("📥 New submission:", submission);
      dispatch(addSubmission(submission));
    });

    socket.on("submission:statusUpdate", ({ submissionId, status }) => {
      console.log(`📌 Submission ${submissionId} updated to ${status}`);
      dispatch(updateSubmissionStatus({ submissionId, status }));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};

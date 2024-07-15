import Header from "@/components/header/Header";
import MainContent from "@/components/main/MainContent";
import Sidebar from "@/components/shared/Sidebar";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* <Sidebar /> */}
      <Box sx={{ flex: 1 }}>
        <Header />
        <MainContent />
      </Box>
      {/* <OutputSidebar /> */}
    </>
  );
}

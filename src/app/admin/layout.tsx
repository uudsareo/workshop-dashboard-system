import { SideBar } from "../../../components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen bg-white">
      <SideBar />
      <div className="pl-72 w-full rounded-2xl pt-10">
        <div className="bg-gray-50 px-5 rounded-md py-10">{children}</div>
      </div>
    </div>
  );
}

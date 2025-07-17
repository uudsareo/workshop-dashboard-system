import { SideBar } from "../../../components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 rounded-2xl pt-1 overflow-auto">
        <div className="bg-gray-50 px-5 rounded-md py-1">{children}</div>
      </div>
    </div>
  );
}

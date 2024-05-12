import Provider from "@/components/provider/Provider";

export default function Layout({ children }) {
  return (
    <>
      <Provider>{children}</Provider>
    </>
  );
}

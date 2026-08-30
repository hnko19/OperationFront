import SideMenu from "../SideMenu/SideMenu";

export default function ProtuctedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{<SideMenu> {children}  </SideMenu>}</>;
}

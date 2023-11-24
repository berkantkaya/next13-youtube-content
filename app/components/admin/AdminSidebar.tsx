"use client"
import { usePathname } from "next/navigation";
import AdminSidebarItem from "./AdminSidebarItem"
import { MdDashboard, MdBorderOuter,MdOutlineCreate } from "react-icons/md";

const AdminSidebar = () => {
    const pathname = usePathname();
    const adminPanel = [
        {
            name: "Özetler",
            icon: MdDashboard,
            url: "/admin"
        },
        {
            name: "Ürün Olustur",
            icon: MdOutlineCreate,
            url: "/admin/create"
        },
        {
            name: "Ürünleri Yönet",
            icon: MdOutlineCreate,
            url: "/admin/manage"
        },
        {
            name: "Siparişlerim",
            icon: MdBorderOuter,
            url: "/admin/order"
        },
    ]
  return (
    <div className="w-1/5 border-r h-screen p-4 bg-orange-600">
          <div className="space-y-4">
            {
                adminPanel.map((admin,i) => (
                    <AdminSidebarItem key={i} selected={pathname == admin.url} icon={admin.icon} name={admin.name} url={admin.url}/>
                ))
            }
          </div>
    </div>
  )
}

export default AdminSidebar
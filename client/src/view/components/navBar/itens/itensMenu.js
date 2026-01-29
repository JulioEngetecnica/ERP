import {
  FaHome,
  FaUserCircle,
  FaArchive,
  FaSignOutAlt,
  FaUserEdit,
  FaShieldAlt,
  FaUsers,
  FaBoxes,
  FaFileArchive,
  FaTruck,
  FaWarehouse,
  FaShoppingCart,
  FaFileInvoiceDollar,
  FaFileInvoice,
  FaHandsHelping,
  FaBoxTissue,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import Logout from "../logout/logoutApi";

// Dados do menu
export const useItensMenu = (onNavigate) => {

  const navigate = useNavigate(); 

  const go = (path) => {
    navigate(path);     // ✅ navega
    onNavigate?.();     // 👈 avisa o Sidebar
  };

  return [
    {
      label: "Início",
      icon: FaHome,
      onClick: () => go("/"),
    },
    {
      label: "Perfil",
      icon: FaUserCircle,
      submenu: [
        {
          label: "Editar Perfil",
          icon: FaUserEdit,
          onClick: () => go("/perfil/editar"),
        },
        {
          label: "Segurança",
          icon: FaShieldAlt,
          onClick: () => go("/perfil/seguranca"),
        },
      ],
    },
    {
      label: "Cadastros",
      icon: FaArchive,
      submenu: [
        {
          label: "Serviços",
          icon: FaHandsHelping,
          onClick: () => go("/servicos"),
        },
        {
          label: "Produtos",
          icon: FaBoxes,
          onClick: () => go("/produtos"),
        },
        {
          label: "Clientes",
          icon: FaUsers,
          onClick: () => go("/clientes"),
        },
      ],
    },
    {
      label: "Vendas",
      icon: FaShoppingCart,
      onClick: () => go("/vendas"),
    },
    {
      label: "Faturamento",
      icon: FaFileInvoiceDollar,
      submenu: [
        {
          label: "Emitir NFe",
          icon: FaFileInvoice,
          onClick: () => go("/faturamento/nfe"),
        },
      ],
    },
    {
      label: "Sair",
      icon: FaSignOutAlt,
      onClick: () => {
        Logout();
        go("/login");
      },
    },
  ];
};
import {
  FaHome,
  FaUserCircle,
  FaArchive,
  FaSignOutAlt,
  FaUserEdit,
  FaShieldAlt,
  FaUsers,
  FaBox,
  FaTruck,
  FaWarehouse,
  FaShoppingCart,
  FaFileInvoiceDollar,
  FaFileInvoice,
} from "react-icons/fa";

// Dados do menu
export const itensMenu = [
  {
    label: "Início",
    icon: FaHome,
    onClick: () => console.log("Início"),
  },
  {
    label: "Perfil",
    icon: FaUserCircle,
    submenu: [
      { label: "Editar Perfil", icon: FaUserEdit, onClick: () => console.log("Editar Perfil") },
      { label: "Segurança", icon: FaShieldAlt, onClick: () => console.log("Segurança") },
    ],
  },
  {
    label: "Cadastros",
    icon: FaArchive,
    submenu: [
      { label: "Clientes", icon: FaUsers, onClick: () => console.log("Clientes") },
      { label: "Produtos", icon: FaBox, onClick: () => console.log("Produtos") },
      { label: "Fornecedores", icon: FaTruck, onClick: () => console.log("Fornecedores") },
    ],
  },
  {
    label: "Estoque",
    icon: FaWarehouse,
    onClick: () => console.log("Estoque"),
  },
  {
    label: "Vendas",
    icon: FaShoppingCart,
    onClick: () => console.log("Vendas"),
  },
  {
    label: "Faturamento",
    icon: FaFileInvoiceDollar,
    submenu: [
      { label: "Emitir NFe", icon: FaFileInvoice, onClick: () => console.log("Emitir NFe") },
    ],
  },
  {
    label: "Sair",
    icon: FaSignOutAlt,
    onClick: () => console.log("Sair"),
  },
];

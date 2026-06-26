import { CardDemo } from "@/Pages/Login/index"
import { CardCadastro } from "@/Pages/Cadastro/index"
import { HomePage } from "@/Pages/HomePage/index"
import { Dashboard } from "@/Pages/Dashboard/index"
import { CardCarrinho } from "./Pages/Carrinho"
import { Compras } from "./Pages/compras"
import { Explorar } from "./Pages/Explorar"
import { Card404 } from "./Pages/404"
import { Navigate, Route, Routes } from "react-router-dom";
import { EmpresaPerfil } from "./Pages/Perfil_Empresa"
import { PerfilUsuario } from "./Pages/Usuario_perfil"
import { EmpresaPerfil_V } from "./Pages/perfil_empresa_visitante"
import { PerfilUsuarioVisitante } from "./Pages/perfil_ususariov"
import { Mensagens } from "./Pages/mensagem"
import { Produto_detalhes } from "./Pages/produtos"
import { Esqueceusenha } from "./Pages/recuperação_de_senha"
import { Config } from "./Pages/Config"
import { CompraConfirmada } from "./Pages/confirmação_de_compra"

function App() {
  return (  
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cadastro" element={<CardCadastro />} />
        <Route path="/login" element={<CardDemo />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/carrinho" element={<CardCarrinho />} />
        <Route path="/Compras" element={<Compras />} />
        <Route path="/Explorar" element={<Explorar />} />
        <Route path="/404" element={<Card404 />} />
        <Route path="/empresaperfi" element={<EmpresaPerfil />}/>
        <Route path="/empresaperfi1" element={<EmpresaPerfil_V />}/>
        <Route path="/user" element={< PerfilUsuario />}/>
        <Route path="/user1" element={< PerfilUsuarioVisitante   />}/>
        <Route path="/c" element={< Config />}/>
        <Route path="/cc" element={< CompraConfirmada />}/>
        <Route path="/m" element={< Mensagens   />}/>
        <Route path="/p" element={< Produto_detalhes   />}/>
        <Route path="/r" element={< Esqueceusenha   />}/>
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default App;
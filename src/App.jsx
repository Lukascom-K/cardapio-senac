import { useState } from "react";
import Header from "./components/Header.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Selecao from "./pages/Selecao.jsx"

function App() {
    const [telaAtiva, setTelaAtiva] = useState('cadastro')

    return (
        <div>
            <Header telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva}></Header>
            <main>
                {telaAtiva === 'cadastro' && <Cadastro />}
                {telaAtiva === 'selecao' && <Selecao />}
            </main>
        </div>
    )
}

export default App
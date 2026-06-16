import { useState } from "react";
import Header from "./components/Header.jsx";
import Cadastro from "./pages/Cadastro.jsx";

function App() {
    const [telaAtiva, setTelaAtiva] = useState('cadastro')

    return (
        <div>
            <Header telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva}></Header>
            <main>
                {telaAtiva === 'cadastro' && <Cadastro />}
            </main>
        </div>
    )
}

export default App
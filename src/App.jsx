import { useState } from "react";
import Header from "./components/Header.jsx";

function App() {
    const [telaAtiva, setTelaAtiva] = useState('cadastro')

    return (
        <div>
            <Header telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva}></Header>
            <main>
                <p>Tela:{telaAtiva}</p>
            </main>
        </div>
    )
}

export default App
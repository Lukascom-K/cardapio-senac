import { useContext, useState } from "react";
import { CardapioContext } from "../context/CardapioContext";

export default function Cadastro() {
    const {pratos, setPratos } = useContext(CardapioContext)
    const [form, setForm] = useState({nome: '',preco:'', tipo: 'Principal', caracteristicas: []})

    const total = pratos.length
    const principais = pratos.filter(p => p.tipo === 'Principal').length
    const veganos = pratos.filter(p => p.caracteristicas.includes('Vegano')).length

    return (
        <div>
            <h2>Cadastro de Pratos</h2>

            <div>
                <span>Total: {total}</span>
                <span>Principais: {principais}</span>
                <span>Veganos: {veganos}</span>
            </div>           
            <div>
                <input
                    placeholder="Nome do Prato"
                    value={form.nome}
                    onChange={e => setForm({...form, nome: e.target.value})}
                />
                <input
                    placeholder="Preço"
                    type="number"
                    value={form.preco}
                    onChange={e => setForm({ ...form, preco: e.target.value })}
                />
                <select
                    value={form.tipo}
                    onChange={e => setForm({ ...form, tipo: e.target.value })}
                >
                    <option>Entrada</option>
                    <option>Principal</option>
                    <option>Sobremesa</option>
                </select>

                <div>
                {['Vegano', 'Vegetariano', 'Sem glúten', 'Sem lactose'].map(c => (
                    <label key={c}>
                    <input
                        type="checkbox"
                        checked={form.caracteristicas.includes(c)}
                        onChange={() => {
                        const lista = form.caracteristicas.includes(c)
                            ? form.caracteristicas.filter(x => x !== c)
                            : [...form.caracteristicas, c]
                        setForm({ ...form, caracteristicas: lista })
                        }}
                    />
                    {c}
                    </label>
                ))}
                </div>

                <button onClick={() => {
                    setPratos([...pratos, { ...form, id: Date.now() }])
                    setForm({ nome: '', preco: '', tipo: 'Principal', caracteristicas: [] })
                }}>
                Cadastrar
                </button>
                
            </div>

            <div>
            {pratos.map(prato => (
                <div key={prato.id}>
                <span>{prato.nome}</span>
                <span>R$ {prato.preco}</span>
                <span>{prato.tipo}</span>
                <button onClick={() => setPratos(pratos.filter(p => p.id !== prato.id))}>
                    Excluir
                </button>
                </div>
            ))}
            </div>

        </div>
    )
}
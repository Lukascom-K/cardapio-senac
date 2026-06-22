/* ================================================
   Helpers compartilhados — Cardápio Senac
   ================================================ */

export const RESTRICOES = [
  { key: 'Vegano',       emoji: '🌱', label: 'Vegano',       badge: 'badge-vegano',      ariaLabel: 'Vegano: sem produtos de origem animal' },
  { key: 'Vegetariano',  emoji: '🥗', label: 'Vegetariano',  badge: 'badge-vegetariano', ariaLabel: 'Vegetariano: sem carnes' },
  { key: 'Sem glúten',   emoji: '🌾', label: 'Sem glúten',   badge: 'badge-semgluten',   ariaLabel: 'Sem glúten: adequado para celíacos' },
  { key: 'Sem lactose',  emoji: '🥛', label: 'Sem lactose',  badge: 'badge-semlactose',  ariaLabel: 'Sem lactose: sem laticínios' },
]

export const RESTRICOES_KEYS = RESTRICOES.map(r => r.key)
export const RESTRICOES_MAP  = Object.fromEntries(RESTRICOES.map(r => [r.key, r]))

export const TIPOS = ['Entrada', 'Principal', 'Sobremesa']

export const TIPOS_CONFIG = {
  Entrada:   { emoji: '🥗', badge: 'badge-entrada'   },
  Principal: { emoji: '🍽️', badge: 'badge-principal' },
  Sobremesa: { emoji: '🍮', badge: 'badge-sobremesa' },
}

export function badgeTipo(tipo) {
  return `badge ${TIPOS_CONFIG[tipo]?.badge || 'badge-principal'}`
}

export function badgeCaract(key) {
  return `badge ${RESTRICOES_MAP[key]?.badge || 'badge-principal'}`
}

export function labelCaract(key) {
  const r = RESTRICOES_MAP[key]
  return r ? `${r.emoji}\u00A0${r.label}` : key
}

export function labelTipo(tipo) {
  const t = TIPOS_CONFIG[tipo]
  return t ? `${t.emoji}\u00A0${tipo}` : tipo
}

export const DIAS_SEMANA = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado']

export function formatarData(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  const dt = new Date(+y, +m - 1, +d)
  return `${DIAS_SEMANA[dt.getDay()]}, ${d}/${m}/${y}`
}

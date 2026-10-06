import { PersonaDefinition, PersonaKey, LegacyPersona } from '@/types/inventory';

// The people who run a plant. An organisation is a plant, so every persona is an internal role.
// `key` is what InventoryContext stores; `short` is the label on narrow screens.
export const PERSONAS: PersonaDefinition[] = [
  { key: 'supervisor', label: 'Plant Supervisor', medium: 'Supervisor', short: 'SUP', sub: 'Keeps the lines running: which materials could stop production, and what to do about it.' },
  { key: 'warehouse', label: 'Warehouse Manager', medium: 'Warehouse', short: 'WH', sub: 'Owns physical stock: excess, ageing and duplicate inventory, and how to clear it.' },
  { key: 'planner', label: 'Materials Planner', medium: 'Planner', short: 'PLN', sub: 'Matches material cover to the production plan and to swings in demand.' },
  { key: 'procurement', label: 'Procurement Officer', medium: 'Procurement', short: 'PRO', sub: 'Decides what to order, when and how much, given lead times and sourcing risk.' },
  { key: 'finance', label: 'Finance Controller', medium: 'Finance', short: 'FIN', sub: 'Watches cash tied up in inventory and what each decision releases or locks.' },
];

export const PERSONA_KEYS: PersonaKey[] = PERSONAS.map((p) => p.key);
export const DEFAULT_PERSONA: PersonaKey = 'supervisor';

export const personaLabel = (key: string): string =>
  PERSONAS.find((p) => p.key === key)?.label ?? key;

// Stage pages that have not been rewritten for the plant personas yet still branch on the old
// 'analyst' / 'exec' keys. This maps each plant persona to the nearest old branch.
export const LEGACY_LENS: Record<PersonaKey, LegacyPersona> = {
  supervisor: 'analyst',
  warehouse: 'analyst',
  planner: 'analyst',
  procurement: 'analyst',
  finance: 'exec',
};

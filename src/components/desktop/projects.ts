export interface ProjectFolder {
  name: string;
  github: string;
}

/** Projects with a public GitHub link — sourced from src/components/Projects.tsx. */
export const PROJECTS: ProjectFolder[] = [
  { name: 'Replicated Editor', github: 'https://github.com/vihaann06/replicated-editor' },
  { name: 'Graphene', github: 'https://github.com/cs1060f25/graph-project' },
  { name: 'COMPASS', github: 'https://github.com/Tapiocaba/contextual-llm-privacy' },
  { name: 'Inventory Control RL', github: 'https://github.com/vihaann06/inventory-prediction' },
  { name: 'Prodspace', github: 'https://github.com/vihaann06/prodspace' },
  {
    name: 'Privacy Optimizer',
    github: 'https://github.com/vihaann06/cs208-optimiser/tree/main',
  },
  {
    name: 'Philosophy Quotes',
    github: 'https://github.com/vihaann06/Random-Philosopy-Quote',
  },
  { name: 'Fantasy World', github: 'https://github.com/vihaann06/fantasyworld' },
];

// interfaces/IGrupo.ts
export interface IGrupo {
  id: number;
  nombre: string;
  descripcion?: string; // Opcional
  activo: boolean;
}

// interfaces/ISubgrupo.ts
export interface ISubgrupo {
  id: number;
  nombre: string;
  grupoId: number;
}

// interfaces/IEstado.ts
export interface IEstado {
  id: number;
  nombre: string;
  subgrupoId: number;
  color?: string;
}

// interfaces para los props del componente
export interface IDependentSelectsProps {
  onSelectionChange?: (selection: ISelection) => void;
  disabled?: boolean;
  className?: string;
}

export interface ISelection {
  grupo: IGrupo | null;
  subgrupo: ISubgrupo | null;
  estado: IEstado | null;
}

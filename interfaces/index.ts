export interface IApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ISelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface IDependentSelectsData {
  grupos: ISelectOption[];
  subgrupos: ISelectOption[];
  estados: ISelectOption[];
}

export interface ISelectedValues {
  grupo: string;
  subgrupo: string;
  estado: string;
}

// Props del componente principal
export interface IDependentSelectsProps {
  onSelectionChange: (values: ISelectedValues) => void;
  disabled?: boolean;
  className?: string;
  apiUrls?: {
    grupos: string;
    subgrupos: string;
    estados: string;
  };
}

// Estado del componente
export interface IDependentSelectsState {
  data: IDependentSelectsData;
  selected: ISelectedValues;
  loading: {
    grupos: boolean;
    subgrupos: boolean;
    estados: boolean;
  };
  errors: {
    grupos: string | null;
    subgrupos: string | null;
    estados: string | null;
  };
}

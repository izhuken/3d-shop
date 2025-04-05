export interface NewEventFormData {
  type: { value: string; label: string };
  name: string;

  // всплеск
  people?: number;

  // поломка
  cashbox?: { value: string; label: string };
  start_date?: string;
  end_date?: string;

  // ban shelf
  self_type?: { value: string; label: string };

  //   общие
  rate: number;
}

export interface NewEventFormResult {
  type: { value: string; label: string };
  name: string;

  // всплеск
  people?: number;

  // поломка
  cashbox?: { value: string; label: string };
  start_date?: string;
  end_date?: string;

  // ban shelf
  self_type?: { value: string; label: string };

  //   общие
  rate: number;
}

export class CreateHabitDto {
  name: string;
  duration: string;
  unit: string;
  frequency: number;
  days: string;
  color: string;
}

export class UpdateHabitDto {
  name?: string;
  duration?: string;
  unit?: string;
  frequency?: number;
  days?: string;
  color?: string;
  completion?: number;
  monthProgress?: number;
  yearProgress?: number;
}

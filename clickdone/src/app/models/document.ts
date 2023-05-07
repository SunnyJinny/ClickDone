export interface TextTemplate {
  stepId: number;
  stepTitle: string;
  email?: string;
  startDatum?: string;
  endDatum?: string;
  title?: string;
  content?: string;
} 

export const Texts: TextTemplate[] = [
  {
    stepId: 2,
    stepTitle: 'Auswählen einen Schüler/in',
  },
  {
    stepId: 3,
    stepTitle: '(optionale) hinzufügen den Zusatz',
  },
  {
    stepId: 4,
    stepTitle: 'Überprüfen den fertigen Text',
  },
  {
    stepId: 5,
    stepTitle: 'E-Mail erfolgreich gesendet.',
  } 
]

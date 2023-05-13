export class TextTemplate {
  type?: string;
  name?: string;
  email?: string;
  startDatum?: string;
  endDatum?: string;
  betreuer?: string;
  title?: string;
  content?: string;
} 

export const Template = `<p>Praktikumszeugnis für <em><strong>{{ templateInfo.name || 'Scüler/in' }}</strong></em></p>`


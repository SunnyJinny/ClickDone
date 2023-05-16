export type State = 'Fehlende Unterlagen' | 'Zusage' | 'Absage' | 'Im Bewerbungsprozess' | 'Im Praktikum' | 'Platz angenommen' | 'Frei' | 'Abgeschlossen' ;

export interface Student {
  _id: string;
  name: string;
  geburtsdatum: string;
  geschlecht: string;
  adresse: string;
  schule: string;
  email: string;
  betreuer: string;
  bewerbungDatum: string;
  rueckmeldungDatum: string;
  startDatum: string;
  endDatum: string;
  status: string;
  motivation?: boolean;
  lebenslauf?: boolean;
  zeugnis?: boolean;
  notiz?: string;
  bewertung?: string;
}

export interface StudentChart {
  x: Date[],
  y: string,
  id: string
}

// export const SchuelerListe: Student[] = [
//   {
//     name: 'Isabell König', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Melatenerstraße 20', 
//     schule: 'Couven-Gymnasium', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Fehlende Unterlagen',
//   },
//   {
//     name: 'Anna Schulz', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Melatenerstraße 2', 
//     schule: 'Couven-Gymnasium', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Fehlende Unterlagen',
//   },
//   {
//     name: 'Markus Anger', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Melatenerstraße 10', 
//     schule: 'Gemeinschafthauptschule Drimborn', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Fehlende Unterlagen',
//   },
//   {
//     name: 'Rudolf Moser', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Helmertweg 1', 
//     schule: 'Städt. Gemeinschaftshauptschule', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Fehlende Unterlagen',
//   },
//   {
//     name: 'Felix Bauer', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Claßenstraße 11', 
//     schule: 'Couven-Gymnasium', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Fehlende Unterlagen',
//   },
//   {
//     name: 'Florian Heigl', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Templergraben 61', 
//     schule: 'Couven-Gymnasium', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Zusage',
//   },
//   {
//     name: 'Heiko Moser', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Kopernikusstraße 16', 
//     schule: 'St. Leonhard Gymnasium', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Zusage',
//   },
//   {
//     name: 'Hans Fuchs', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Claßenstraße 11', 
//     schule: 'St. Leonhard Gymnasium', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Zusage',
//   },
//   {
//     name: 'Jonas Muller', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Ahornstraße 55', 
//     schule: 'St. Leonhard Gymnasium', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Zusage',
//   },
//   {
//     name: 'Dietz Tobias', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Theaterpl. 5', 
//     schule: 'Gemeinschafthauptschule Drimborn', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Zusage',
//   },
//   {
//     name: 'Thomas Kaiser', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Claßenstraße 11', 
//     schule: 'Gemeinschafthauptschule Drimborn', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Absage',
//   },
//   {
//     name: 'Lea Hoffmann', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Melatenerstraße 20', 
//     schule: 'Couven-Gymnasium', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Absage',
//   },
//   {
//     name: 'Jan Schmidt', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Ahornstraße 55', 
//     schule: 'Städt. Gemeinschaftshauptschule', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Absage',
//   },
//   {
//     name: 'Andreas Maier', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Templergraben 61', 
//     schule: 'Städt. Gemeinschaftshauptschule', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Absage',
//   },
//   {
//     name: 'Lucia Schmmidt', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Claßenstraße 11', 
//     schule: 'Couven-Gymnasium', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Absage',
//   },
//   {
//     name: 'Theo Hartmann', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Templergraben 11', 
//     schule: 'St. Leonhard Gymnasium', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Im Bewerbungsprozess',
//   },
//   {
//     name: 'Kuis Meyer', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Melatenerstraße 20', 
//     schule: 'Couven-Gymnasium', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Im Bewerbungsprozess',
//   },
//   {
//     name: 'Max Becker', 
//     geburtsdatum: new Date(2008, 12, 27).toLocaleDateString('de'), 
//     adresse: 'Templergraben 2', 
//     schule: 'St. Leonhard Gymnasium', 
//     bewerbungDatum: new Date(2023, 2, 17).toLocaleDateString('de'), 
//     rueckmeldungDatum: new Date(2023, 3, 20).toLocaleDateString('de'), 
//     startDatum: new Date(2023, 4, 26).toLocaleDateString('de'), 
//     endDatum: new Date(2023, 5, 15).toLocaleDateString('de'),
//     status: 'Im Bewerbungsprozess',
//   },
// ];

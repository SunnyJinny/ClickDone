export class TextTemplate {
  type!: string;
  name!: string;
  email!: string;
  startDatum!: string;
  endDatum!: string;
  betreuer!: string;
  title!: string;
  content: string = '';
}

export const ZUSAGE_TEMPLATE = ( name: string, startDatum: string, endDatum: string, betreuer: string ) => `<p>Hallo <em><strong>${ name }</strong></em>,</p>
<p style="line-height: 1.5;>vielen Dank für deine Bewerbung und dein Interesse an einem Praktikum bei uns.</p>
<p style="white-space: nowrap;">Hiermit möchte ich dir eine Zusage für dein Praktikum vom <em><strong>${ startDatum }</strong></em> bis zum <em><strong>${ endDatum }</strong></em> erteilen.</p>
<p>Ich möchte mich auch noch kurz vorstellen: <em><strong>${ betreuer }</strong></em></p>          
<span>
  Ein Praktikum bei uns ist sehr abwechslungsreich und du wirst viele verschiedene Einblicke erhalten können. Unsere Praktika finden in Hybrider Form statt. Unter https://www.informatik.rwth-aachen.de/cms/informatik/Studium/Infos-fuer-Schuelerinnen-und-Schueler/~nmbv/Schulpraktikum/ kannst du mehr darüber erfahren, was dich in dem Praktikum erwartet. 
  Einen genauen Plan, welche Tage vor Ort und welche im Homeoffice erfolgen und was dich an den einzelnen Tagen erwartet, wirst du ca. eine Woche vor Beginn deines Praktikums erhalten. Die Arbeitszeit ist täglich von 9 Uhr bis ca. 16 Uhr, inkl. 1h Pause.
  Alle Materialien für das Praktikum sowie alle Ergebnisse, welche du während deines Praktikums erarbeitest, werden wir in einem Google Drive sammeln. Den Zugang hierzu bekommst du an deinem ersten Praktikumstag.
  An vielen Schulen gibt es ein Formular, welches von dem Praktikumsbetrieb auszufüllen ist. Wenn es das bei dir auch gibt, dann kannst du mir dieses gerne direkt als Scan schicken und du bekommst das ausgefüllte Formular direkt per Mail von mir zurück.
</span>
<p>Bei Fragen kannst du dich gerne jederzeit bei mir melden.</p>
<p>Bitte gebe mir eine kurze Rückmeldung, ob du den Praktikumsplatz annimmst.</p>
<br>
<p>Viele Grüße</p>
<p><em><strong>${ betreuer }</strong></em></p>`;

export const ABSAGE_TEMPLATE = ( name: string, startDatum: string, endDatum: string, betreuer: string ) => `<p>Hallo <em><strong>${ name }</strong></em>,</p>
<p>vielen Dank für deine Bewerbung und dein Interesse an einem Praktikum bei und. Leider können wir dir im Zeitraum vom <em><strong>${ startDatum }</strong></em> bis zum <em><strong>${ endDatum }</strong></em> keinen Praktikumsplatz anbieten, da Grund.</p>
<p>Ich wünsche dir alles Gute und viel Erfolg bei der Suche nach einem Praktikumsplatz!</p>
<br><p>Viele Grüße</p><p><em><strong>${ betreuer }</strong></em></p>`;

export const ZEITPLAN_TEMPLATE = ( name: string, betreuer: string ) => `<p>Hallo <em><strong>${ name }</strong></em>,</p>
<p>Hier ist deinen Zeitplan,</p><textarea></textarea><br><p>Viele Grüße</p><p><em><strong>${ betreuer }</strong></em></p>`;

export const ZEUGNIS_TEMPLATE = ( name: string, startDatum: string, endDatum: string ) => `<p>Praktikumszeugnis für <em><strong>${ name }</strong></em></p>
<p><em><strong>${ name }</strong></em>, geboren am <em>Geburtsdatum</em> hat vom <em><strong>${ startDatum }</strong></em> bis <em><strong>${ endDatum }</strong></em> <em>sein/ihr</em> Schülerpraktikum in hybrider Form in der Fachgruppe Informatik der RWTH Aachen, 
vertreten durch <em>Anbieter</em>, absolviert. <em>Vorstellung Anbieter</em></p>
<p><em><strong>${ name }</strong></em> hat in <em>seinem/ihrem</em> Praktikum einen Einblick in die Tätigkeiten von wissenschaftlichen Mitarbeitenden im Bereich Informatik erhalten. <em>Beschreibung der Aufgaben</em></p>
<p><em><strong>${ name }</strong></em> arbeitete <em>Bewertung</em> motiviert und <em>Bewertung</em> selbstständig. <em>Seine/Ihre</em> Aufgaben erfüllte <em>er/sie</em> <em>Bewertung</em> Zufriedenheit. <em>Er/Sie</em> war <em>Bewertung</em> pünktlich und <em>Bewertung</em> zuverlässig.</p>
<p>Ganz besondere Anerkennung erhält <em><strong>${ name }</strong></em> für <em>Aufgabe</em>.</p>
<p>Wir danken <em><strong>${ name }</strong></em> außerordentlich für <em>seine/ihre</em> tolle Unterstützung während <em>seines/ihres</em> Praktikums und wünschen <em>ihm/ihr</em> für <em>seinen/ihren</em> weiteren Werdegang viel Erfolg.</p>`;

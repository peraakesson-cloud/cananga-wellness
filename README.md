# Cananga Wellness — webbplats

Webbplatsen för Cananga Wellness, Aschebergsgatan 14 i Helsingborg.

Sidan är byggd i ren HTML, CSS och JavaScript. Det finns inget program som
behöver installeras, inget som behöver "byggas" och ingen månadskostnad.
Filerna ligger på GitHub och visas gratis via GitHub Pages.

**Adress till sidan:** https://peraakesson-cloud.github.io/cananga-wellness/

---

## Innehåll

- [Titta på sidan innan du ändrar](#titta-på-sidan-innan-du-ändrar)
- [Ändra ett pris](#ändra-ett-pris)
- [Lägga till en behandling](#lägga-till-en-behandling)
- [Ta bort en behandling](#ta-bort-en-behandling)
- [Ändra öppettider](#ändra-öppettider)
- [Ändra telefonnummer eller adress](#ändra-telefonnummer-eller-adress)
- [Koppla in bokningskalendern](#koppla-in-bokningskalendern)
- [Publicera dina ändringar](#publicera-dina-ändringar)
- [Att göra innan sidan visas för kunder](#att-göra-innan-sidan-visas-för-kunder)
- [Egen domän](#egen-domän)
- [Rör inte det här](#rör-inte-det-här)
- [Vad varje fil gör](#vad-varje-fil-gör)

---

## Titta på sidan innan du ändrar

Dubbelklicka på filen `index.html`. Sidan öppnas i din webbläsare precis som
den ser ut på riktigt. Ingen internetuppkoppling behövs.

> Bokningskalendern är det enda som inte fungerar när du öppnar filen så här —
> den behöver ligga på nätet. Allt annat ser du direkt.

Gör en ändring, spara filen, och tryck sedan på uppdatera-knappen i
webbläsaren så ser du resultatet på en gång.

---

## Ändra ett pris

Öppna `index.html` i en textredigerare (TextEdit, Anteckningar eller
Visual Studio Code — vad som helst som visar ren text).

Sidan har två behandlingar: 60 min för 600 kr och 30 min för 400 kr.
Sök efter priset du vill ändra (`600` eller `400`) så hittar du **två
ställen**. Båda måste ändras.

**Ställe 1 — det kunden ser:**

```html
<span class="treatment__amount">600&nbsp;kr</span>
```

Ändra `600` till det nya priset. Låt `&nbsp;kr` stå kvar — det är ett
mellanslag som håller ihop siffran och "kr" på samma rad.

**Ställe 2 — det Google läser:**

Längst ner i filen, under rubriken `STRUKTURERAD DATA`:

```json
"price": "600",
```

Skriv samma siffra här. Här ska det bara vara siffror, inget "kr".

Varje behandling har ett eget `"price"`-block under `"makesOffer"` — se till
att du ändrar rätt.

Och en rad till, en bit upp i samma block, som visar prisspannet:

```json
"priceRange": "400–600 kr",
```

> **Varför två ställen?** Det översta är texten på sidan. Det nedersta är en
> osynlig sammanfattning som Google läser för att kunna visa pris direkt i
> sökresultatet. Glömmer du det nedre visar Google gammalt pris.

---

## Lägga till en behandling

I `index.html`, sök efter `EN BEHANDLING = ETT`. Där börjar behandlingsblocket.

Markera och kopiera **hela** stycket från `<li class="treatment">` till och
med `</li>`. Klistra in kopian direkt efter, och ändra namn, pris och tid:

```html
<li class="treatment">
  <div class="treatment__head">
    <h3 class="treatment__name">Thaimassage 90 min</h3>
    <p class="treatment__price">
      <span class="treatment__amount">850&nbsp;kr</span>
      <span class="treatment__time">90 min</span>
    </p>
  </div>
  <p class="treatment__desc">
    Samma behandling i lugnare tempo, med mer tid för rygg, axlar och ben.
  </p>
</li>
```

Vill du att den nya behandlingen också ska synas för Google — kopiera blocket
under `"makesOffer"` längst ner i filen på samma sätt, och sätt ett komma
mellan blocken.

---

## Ta bort en behandling

Radera hela stycket från `<li class="treatment">` till och med `</li>`.
Radera också motsvarande block under `"makesOffer"` längst ner.

---

## Ändra öppettider

I `index.html`, sök efter `ÖPPETTIDER`. Där ligger listan:

```html
<div class="hours__row"><dt>Måndag</dt><dd>10:00–21:00</dd></div>
```

Ändra tiderna mellan `<dd>` och `</dd>`. Håller ni stängt en dag skriver du:

```html
<div class="hours__row"><dt>Söndag</dt><dd>Stängt</dd></div>
```

**Glöm inte Google-delen.** Längst ner i filen står:

```json
"dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
"opens": "10:00",
"closes": "21:00"
```

Har alla dagar samma tider räcker det att ändra `opens` och `closes`.
Stänger ni en dag — ta bort den dagen ur listan. Söndag heter `"Sunday"`,
lördag `"Saturday"`.

Har olika dagar olika tider behövs två block. Fråga hellre om hjälp än gissa
här — resten av sidan påverkas inte om det blir fel, men Google kan sluta
visa era tider.

Kom också ihåg att ändra tiderna i **Cal.com** under *Availability*, annars
går det att boka tider ni har stängt.

---

## Ändra telefonnummer eller adress

Telefonnumret står på flera ställen. Sök efter `076-173` och byt **alla**
träffar. Varje gång finns numret i två former:

```html
<a href="tel:+46761739845">076-173&nbsp;98&nbsp;45</a>
```

- `tel:+46761739845` är det som ringer upp när man trycker. Skrivs utan
  mellanslag, med `+46` i stället för den inledande nollan.
- `076-173&nbsp;98&nbsp;45` är det som syns. `&nbsp;` betyder mellanslag.

Numret finns också längst ner i filen som `"telephone": "+46761739845"`.

Adressen ändrar du på samma sätt — sök efter `Aschebergsgatan` och byt alla
träffar, inklusive de längst ner i `"address"`-blocket och i Google Maps-länken.

Samma sak i `integritetspolicy.html` och `404.html`.

---

## Koppla in bokningskalendern

Besökaren klickar på **Visa bokningskalender**. Då öppnas hela din
Cal.com-kalender inne på sidan, och kunden väljer själv 30 eller 60
minuter och sedan en tid.

Inställningen ligger i `index.html`. Sök efter `ÄNDRA HÄR`:

```js
var CAL_EVENTS = [
  { label: "Visa bokningskalender", price: "", link: "canangewellness-vjsgfw", namespace: "boka" }
];
```

- `label` — texten på knappen här på webbplatsen
- `link` — ditt användarnamn, alltså det som står efter `cal.com/`
- `namespace` och `price` — låt stå som de är

**Lägger du till en behandling i Cal.com** dyker den upp i kalendern
automatiskt — du behöver inte ändra något här. Men lägg till den i
listan **Behandlingar** längre upp på sidan också, den är separat.

> ⚠️ **Byt inte användarnamn i Cal.com** om du inte måste. Gör du det
> slutar kalendern fungera direkt, och `link` ovan måste uppdateras till
> det nya namnet. Vill du ändra hur namnet *ser ut* för kunden — ändra
> visningsnamnet under Settings → Profile i stället, det påverkar
> ingenting här.

Om länken är fel visar sidan automatiskt "Ring oss så bokar vi åt dig"
i stället för en trasig kalender.

### Öppettider i kalendern

Tiderna som går att boka styrs av **Availability** i Cal.com, inte av
öppettiderna på webbplatsen. Ändrar du öppettider måste du ändra på båda
ställena, annars går det att boka tider ni har stängt.

Kalendern laddas först när besökaren klickar på *Visa bokningskalender*.
Det är med flit: inget skickas till Cal.com förrän kunden själv väljer det,
vilket gör sidan snabbare och enklare enligt dataskyddsreglerna.

Vill du hellre att kalendern syns direkt — leta efter kommentaren om det
strax under, i samma block.

### Byta till ett annat bokningssystem

Allt som rör bokning ligger mellan kommentarerna `BOKNINGSWIDGET — START`
och `BOKNINGSWIDGET — SLUT` i `index.html`. Radera allt däremellan och
klistra in koden från den nya leverantören. Inget annat på sidan påverkas.

Telefonnumret under kalendern ligger med flit **utanför** det blocket, så att
det finns kvar även om bokningssystemet ligger nere.

---

## Publicera dina ändringar

Enklast utan program, direkt i webbläsaren:

1. Gå till https://github.com/peraakesson-cloud/cananga-wellness
2. Klicka på filen du vill ändra, till exempel `index.html`.
3. Klicka på pennan (**Edit this file**) uppe till höger.
4. Gör din ändring.
5. Skriv en kort rad om vad du ändrade, till exempel `Nytt pris på thaimassage`.
6. Klicka **Commit changes**.

Vänta 1–2 minuter, ladda sedan om webbplatsen. Ändringen är ute.

> Blev något fel? Ingen fara — inget går förlorat. Gå till fliken **Commits**,
> öppna den senaste ändringen och klicka **Revert**. Då är sidan tillbaka som
> den var.

---

## Att göra innan sidan visas för kunder

- [ ] Fyll i organisationsnummer i `integritetspolicy.html` (rubrik 1)
- [ ] Fyll i e-postadress i `integritetspolicy.html` (rubrik 1 och 9)
- [ ] Ta bort den markerade rutan "Att fylla i innan publicering" i samma fil
- [ ] Rätta namnet i Cal.com: profilen heter `cananage-wellness`, ska vara
      `cananga-wellness` (syns för kunden i bokningskalendern)
- [ ] Vill du visa e-postadress på startsidan? Sök efter `E-POST` i
      `index.html` och ta bort kommentarstecknen runt raden
- [ ] Öppna sidan i din egen telefon och kontrollera att allt ser rätt ut

---

## Egen domän

Sidan ligger idag på `peraakesson-cloud.github.io/cananga-wellness`. Vill ni ha
till exempel `canangawellness.se` gör ni så här.

**1. Köp domänen** hos en registrar — Loopia, One.com, Inleed och Namecheap
är vanliga.

**2. Lägg in DNS-poster** hos registraren. För `www.canangawellness.se`:

| Typ | Namn | Värde |
|---|---|---|
| CNAME | `www` | `peraakesson-cloud.github.io` |

Vill ni att adressen ska fungera **utan** `www` behövs fyra A-poster till:

| Typ | Namn | Värde |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**3. Skapa filen `CNAME`** i det här projektet — versaler, utan filändelse.
Den ska innehålla en enda rad:

```
www.canangawellness.se
```

**4. I GitHub:** Settings → Pages → *Custom domain* → skriv in domänen →
**Save**. Kryssa sedan i **Enforce HTTPS** när rutan blir valbar (det kan ta
upp till en timme innan certifikatet är klart).

**5. Byt adress i fyra filer**, så att Google och delningar pekar rätt.
Sök efter `peraakesson-cloud.github.io/cananga-wellness` och byt till den nya
adressen i:

- `index.html` (`canonical`, `og:url`, `og:image` och `"url"` längst ner)
- `integritetspolicy.html` (samma taggar)
- `sitemap.xml` (båda adresserna)
- `robots.txt` (raden `Sitemap:`)

DNS-ändringar kan ta några timmar innan de slår igenom.

---

## Rör inte det här

Går bra att ändra fritt:

- All text mellan `>` och `<`, alltså det man läser på sidan
- Priser, tider, telefonnummer, adress

Ändra bara om du vet vad du gör:

- `css/style.css` — utseendet. Färgerna ligger överst under `:root`.
- `js/main.js` — menyn och knappen längst ner på mobilen
- Allt som börjar med `<` och slutar med `>` — det styr strukturen

Ett bortglömt `<` eller `"` kan göra att en del av sidan försvinner. Blir det
konstigt: ångra i GitHub enligt avsnittet ovan.

---

## Vad varje fil gör

| Fil | Vad den gör |
|---|---|
| `index.html` | Startsidan — hero, behandlingar, bokning, öppettider, hitta hit |
| `integritetspolicy.html` | Integritetspolicy enligt GDPR |
| `404.html` | Visas om någon skriver fel adress |
| `css/style.css` | Allt utseende: färger, typsnitt, avstånd |
| `js/main.js` | Meny på mobil, årtal i sidfoten, fast bokningsknapp |
| `img/favicon.svg` | Den lilla ikonen i webbläsarens flik |
| `img/og-image.png` | Bilden som visas när sidan delas i Messenger, SMS eller Facebook |
| `robots.txt` | Säger till sökmotorer att de får läsa sidan |
| `sitemap.xml` | Lista över sidorna, för sökmotorer |
| `.nojekyll` | Teknisk fil som gör att GitHub publicerar sidan direkt |
| `README.md` | Den här filen |

---

## Teknik, kort

Ingen bygg-process, inga ramverk, inga npm-paket. Inga typsnitt hämtas från
Google. Inga kakor och ingen besöksstatistik. Det enda som laddas utifrån är
bokningskalendern, och först när besökaren klickar på den.

Färger, typsnitt och mått ligger som CSS-variabler överst i `css/style.css`.

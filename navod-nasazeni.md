# Návod: Nasazení webu Historické stroje Fimas
## GitHub + Vercel + doména historicke-stroje.cz

---

## Co budeš potřebovat
- Účet na **GitHub** (github.com) — zdarma
- Účet na **Vercel** (vercel.com) — zdarma (Hobby plán)
- Přístup do **administrace Wedos** pro doménu historicke-stroje.cz

---

## KROK 1: Vytvoř účet na GitHubu (pokud nemáš)

1. Jdi na **https://github.com/signup**
2. Zaregistruj se (email, heslo, uživatelské jméno)
3. Potvrď email

---

## KROK 2: Vytvoř nový repozitář na GitHubu

1. Po přihlášení klikni vpravo nahoře na **"+"** → **"New repository"**
2. Vyplň:
   - **Repository name:** `historicke-stroje`
   - **Description:** `Web Historické stroje Fimas`
   - **Visibility:** Public
   - Zaškrtni **"Add a README file"** — NE (máme vlastní)
3. Klikni **"Create repository"**
4. Uvidíš prázdný repozitář s instrukcemi

---

## KROK 3: Nahraj soubory do repozitáře

### Varianta A: Přes webové rozhraní (nejjednodušší)

1. Na stránce nového repozitáře klikni na **"uploading an existing file"**
2. Rozbal stažený ZIP soubor **historicke-stroje-repo.zip** na počítači
3. Přetáhni VŠECHNY 4 soubory do okna GitHubu:
   - `index.html`
   - `PJF_5591male.webp`
   - `vercel.json`
   - `README.md`
4. Dole napiš commit message: `Počáteční verze webu`
5. Klikni **"Commit changes"**

### Varianta B: Přes příkazový řádek (pro pokročilé)

```bash
git clone https://github.com/TVOJE-JMENO/historicke-stroje.git
cd historicke-stroje
# Zkopíruj sem rozbalené soubory z ZIPu
git add .
git commit -m "Počáteční verze webu"
git push origin main
```

---

## KROK 4: Vytvoř účet na Vercelu a propoj s GitHubem

1. Jdi na **https://vercel.com/signup**
2. Zvol **"Continue with GitHub"** — tím propojíš účty
3. Povol přístup Vercelu k tvým repozitářům

---

## KROK 5: Importuj projekt do Vercelu

1. Po přihlášení na Vercel klikni **"Add New..."** → **"Project"**
2. Najdi repozitář **historicke-stroje** a klikni **"Import"**
3. Nastavení projektu:
   - **Framework Preset:** `Other`
   - **Root Directory:** `.` (tečka — nechat výchozí)
   - **Build Command:** nechat prázdné
   - **Output Directory:** `.` (tečka)
4. Klikni **"Deploy"**
5. Počkej cca 30 sekund — web se nasadí
6. Vercel ti dá dočasnou URL (např. `historicke-stroje.vercel.app`) — ověř, že web funguje

---

## KROK 6: Přidej vlastní doménu na Vercelu

1. V dashboardu projektu jdi do **"Settings"** → **"Domains"**
2. Do pole napiš: `historicke-stroje.cz`
3. Klikni **"Add"**
4. Vercel ti ukáže DNS záznamy, které je potřeba nastavit — **zapiš si je!**
   Typicky to budou:
   - **A záznam:** `76.76.21.21`
   - **CNAME záznam pro www:** `cname.vercel-dns.com`

---

## KROK 7: Nastav DNS u Wedosu

1. Přihlaš se do **administrace Wedos** (https://client.wedos.com)
2. Jdi do správy domény **historicke-stroje.cz**
3. Klikni na **"DNS záznamy"** (nebo "DNS správa")
4. **Smaž** případné výchozí A záznamy pro hlavní doménu
5. **Přidej nové záznamy:**

| Typ    | Název (Host)        | Hodnota                   | TTL   |
|--------|---------------------|---------------------------|-------|
| A      | (prázdné / @)       | `76.76.21.21`             | 3600  |
| CNAME  | www                 | `cname.vercel-dns.com`    | 3600  |

6. Ulož změny
7. **Počkej 5–30 minut** na propagaci DNS (někdy až hodiny)

---

## KROK 8: Ověř funkčnost

1. Vrať se na Vercel → **Settings** → **Domains**
2. U domény `historicke-stroje.cz` by se měla zobrazit zelená fajfka ✓
3. Otevři v prohlížeči:
   - **https://historicke-stroje.cz** — měl by se zobrazit web
   - **https://www.historicke-stroje.cz** — taky (přesměruje se)
4. HTTPS certifikát (zámek v prohlížeči) se vygeneruje automaticky

---

## Hotovo! 🎉

Web je online na **historicke-stroje.cz**.

---

## Budoucí úpravy webu

Kdykoli budeš chtít něco změnit:

1. Jdi na GitHub → tvůj repozitář → klikni na `index.html`
2. Klikni na tužku (Edit) vpravo nahoře
3. Uprav obsah v CMS sekci (stroje / galerie / výstavy)
4. Klikni "Commit changes"
5. **Vercel automaticky** během 30 sekund nasadí novou verzi

Nebo mi napiš sem do chatu a já ti připravím aktualizovaný soubor.

---

## Řešení problémů

**Web se nezobrazuje po nastavení DNS:**
- DNS propagace trvá 5 min až 24 hodin
- Zkus vymazat cache prohlížeče nebo otevřít v anonymním okně

**Vercel hlásí chybu domény:**
- Zkontroluj DNS záznamy u Wedosu — musí být přesně podle kroku 7
- Ujisti se, že není zapnuté Wedos přesměrování (DNS parking)

**Fotky se nenačítají:**
- Fotky se načítají z Weebly serveru — to je v pořádku
- Až budeš chtít, můžeme fotky přenést na vlastní hosting

import requests
from bs4 import BeautifulSoup
import json
import time
import os

BASE_URL = "https://obchod.fimas.cz"

# Všechny tvé startovací adresy
START_URLS = [
    "https://obchod.fimas.cz/vseprofekaly-cz-c121_0_1.htm",
    "https://obchod.fimas.cz/RIV-ITALY-c83_0_1.htm",
    "https://obchod.fimas.cz/FEKALNI-NASTAVBY-MALACKY-c12_0_1.htm",
    "https://obchod.fimas.cz/FEKAL-HTS-100-c97_0_1.htm"
]

# Povolené kódy složek, do kterých smí Pavouk vlézt (včetně podkategorií)
POVOLENE_KODY = ['c121', 'c83', 'c12_', 'c12-', 'c97']

print("Spouštím ZELENÉHO MULTI-PAVOUKA (Sekce: Fekály, RIV, Malacky, HTS)...")
hlavicka = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

# Příprava fronty pro všechny startovací adresy
urls_to_visit = START_URLS.copy()
visited_urls = set()
vsechny_produkty = {}
pocitadlo_stranek = 0

while urls_to_visit:
    aktualni_url = urls_to_visit.pop(0)
    
    if aktualni_url in visited_urls:
        continue
        
    visited_urls.add(aktualni_url)
    pocitadlo_stranek += 1
    
    print(f"[{pocitadlo_stranek}] Čtu: {aktualni_url.split('/')[-1][:40]}...")
    
    try:
        res = requests.get(aktualni_url, headers=hlavicka, timeout=15)
        res.encoding = 'utf-8'
        s = BeautifulSoup(res.text, 'html.parser')
        
        # Přečteme nadpis kategorie (H1) z e-shopu
        nadpis = s.find('h1')
        kategorie_text = nadpis.text.strip() if nadpis else "Ostatní díly"
            
        # Stahování produktů
        produkty = s.find_all('div', class_='product')
        for p in produkty:
            title_div = p.find('div', class_='productTitleContent')
            if not title_div: continue
            
            a_tag = title_div.find('a')
            nazev = a_tag.text.strip()
            
            odkaz_na_produkt = a_tag['href']
            if not odkaz_na_produkt.startswith('http'):
                odkaz_na_produkt = BASE_URL + odkaz_na_produkt if odkaz_na_produkt.startswith('/') else BASE_URL + '/' + odkaz_na_produkt
            
            subtitle_tag = p.find('p', class_='productSubtitle')
            podtitul = subtitle_tag.text.strip() if subtitle_tag else ""
            
            cena_span = p.find('span', class_='product_price_text')
            cena = cena_span.text.replace('\xa0', ' ').strip() if cena_span else "Na dotaz"
            
            img_box = p.find('div', class_='img_box')
            obrazek = BASE_URL + img_box.find('img')['src'] if img_box and img_box.find('img') and img_box.find('img')['src'].startswith('/') else "https://via.placeholder.com/100"
                
            sklad = p.find('div', class_='stock_yes') or p.find('div', class_='stock_no')
            dostupnost = sklad.text.strip() if sklad else "Na dotaz"

            unikatni_klic = f"{odkaz_na_produkt}_____{kategorie_text}"

            if unikatni_klic not in vsechny_produkty:
                vsechny_produkty[unikatni_klic] = {
                    "id": str(len(vsechny_produkty) + 1),
                    "name": nazev,
                    "subtitle": podtitul,
                    "price": cena,
                    "stock": dostupnost,
                    "image": obrazek,
                    "category": kategorie_text,
                    "url": odkaz_na_produkt,
                    "description": f"Kategorie: {kategorie_text}\nČíslo dílu: {podtitul}"
                }
                
        # Hledání dalších odkazů: Pustíme ho jen do našich 4 sekcí a jejich podskupin
        for a in s.find_all('a', href=True):
            href = a['href']
            
            # Pokud odkaz obsahuje některý z našich kódů nebo je to další strana stránkování
            je_spravny = any(kod in href for kod in POVOLENE_KODY) or '?strana=' in href
            
            if je_spravny and '.htm' in href:
                plny_odkaz = href if href.startswith('http') else BASE_URL + href if href.startswith('/') else BASE_URL + '/' + href
                if plny_odkaz not in visited_urls and plny_odkaz not in urls_to_visit:
                    urls_to_visit.append(plny_odkaz)
                    
        time.sleep(0.2) 
        
    except Exception as e:
        print(f" -> CHYBA na stránce: {e}")
        continue

seznam_produktu = list(vsechny_produkty.values())

aktualni_slozka = os.path.dirname(os.path.abspath(__file__))
cesta_k_souboru = os.path.join(aktualni_slozka, 'data.json')

with open(cesta_k_souboru, 'w', encoding='utf-8') as f:
    json.dump(seznam_produktu, f, ensure_ascii=False, indent=4)

print(f"\nHOTOVO! 🎉 Staženo celkem {len(seznam_produktu)} záznamů do souboru data.json.")
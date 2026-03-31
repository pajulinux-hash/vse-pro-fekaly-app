import React, { useState, useMemo } from 'react';
import { Text, View, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Linking, Modal, Platform, ImageBackground, useWindowDimensions } from 'react-native';
import productsData from './data.json';

/* ---- N\u00e1hrada @expo/vector-icons pro web ---- */
const ICON_MAP = {
  'globe-outline':      '\u{1F310}',
  'mail-outline':       '\u2709',
  'mail':               '\u2709',
  'search':             '\u{1F50D}',
  'list':               '\u2630',
  'chevron-down':       '\u25BC',
  'chevron-forward':    '\u203A',
  'refresh':            '\u21BB',
  'information-circle': '\u2139\uFE0F',
  'logo-whatsapp':      '\u{1F4AC}',
  'close-circle':       '\u2716',
  'logo-android':       '\u{1F916}',
  'logo-apple':         '\u{1F34E}',
  'person':             '\u{1F464}',
};

function Ionicons({ name, size, color, style }) {
  return (
    <Text style={[{ fontSize: size || 16, color: color || '#000', lineHeight: (size || 16) * 1.2 }, style]}>
      {ICON_MAP[name] || '?'}
    </Text>
  );
}
/* ---- Konec n\u00e1hrady ---- */

const PREFERRED_ORDER = [
  "RIV ITALY", "RIV ITALY  / ACQUA MARINA uz\u00e1v\u011bry plovakov\u00e9", "RIV ITALY  / AMBRA ventily podtlakov\u00e9", "RIV ITALY  / CENTURION \u0161oup\u011b velkokapacitn\u00ed", "RIV ITALY  / GIADA sifony", "RIV ITALY  / GOLD  uz\u00e1v\u011bry plovakov\u00e9", "RIV ITALY  / KAP\u00c1TKO maz\u00e1n\u00ed v\u00fdv\u011bvy", "RIV ITALY  / KATALOG RIV", "RIV ITALY  / OCEAN sifony", "RIV ITALY  / OPALE ventily p\u0159etlakov\u00e9", "RIV ITALY  / PERLA \u0161oup\u011b standartn\u00ed", "RIV ITALY  / SIFON", "RIV ITALY  / SMERALDO p\u0159\u00edslu\u0161enstv\u00ed \u0161oupat", "RIV ITALY  / STAVOZNAK", "RIV ITALY  / TURCHESE \u0161oup\u011b p\u00e1kov\u00e9", "RIV ITALY  / Uz\u00e1v\u011br PLOVAKOV\u00dd", "RIV ITALY  / Ventil PODTLAKOV\u00dd", "RIV ITALY  / Ventil POJISTN\u00dd", "RIV ITALY  / ZAFFIRO p\u0159\u00edslu\u0161enstv\u00ed n\u00e1dr\u017e\u00ed", "RIV ITALY  / \u0160OUP\u011a a p\u0159\u00edslu\u0161enstv\u00ed",
  "FEK\u00c1L HTS 100", "FEK\u00c1L HTS 100 / Brzdy", "FEK\u00c1L HTS 100 / Katalog", "FEK\u00c1L HTS 100 / Koncovky PERROT", "FEK\u00c1L HTS 100 / Oko ta\u017en\u00e9", "FEK\u00c1L HTS 100 / Pohon v\u00fdv\u011bvy a d\u00edly v\u00fdv\u011bvy", "FEK\u00c1L HTS 100 / Stavoznak", "FEK\u00c1L HTS 100 / Uz\u00e1v\u011br horn\u00ed", "FEK\u00c1L HTS 100 / Uz\u00e1v\u011br plovakov\u00fd", "FEK\u00c1L HTS 100 / Uz\u00e1v\u011br zadn\u00ed", "FEK\u00c1L HTS 100 / Vahadlo a d\u00edly n\u00e1pravy", "FEK\u00c1L HTS 100 / V\u00fdv\u011bva - n\u00e1hrada p\u016fvodn\u00ed",
  "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / D\u00edly n\u00e1dr\u017e\u00ed - uz\u00e1v\u011bry", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / D\u00edly podvozk\u016f - vahadla", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Hydraulika - rozvad\u011b\u010de", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Kapot\u00e1\u017e", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / N\u00e1hon kompresoru", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Ovl\u00e1d\u00e1n\u00ed savice", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Panel ovl\u00e1dac\u00ed", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Potrub\u00ed kompresoru", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / P\u0159evodovky, h\u0159\u00eddele, kola", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Rozvad\u011b\u010de", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Rozvod po stroji", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Savice a koncovky", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Stavoznak", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / T\u011bsn\u011bn\u00ed fek\u00e1ln\u00edch n\u00e1staveb", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Uchycen\u00ed n\u00e1dr\u017ee", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Uz\u00e1v\u011br bo\u010dn\u00ed", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Uz\u00e1v\u011br plovakov\u00fd", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Uz\u00e1v\u011br vrchn\u00ed", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Uz\u00e1v\u011br zadn\u00ed", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / Ventily, \u0161oup\u00e1ta, manuovakuo.", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / V\u00fdv\u011bvy - d\u00edly, maz\u00e1n\u00ed", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / hranat\u00e1 p\u0159evodovka", "FEK\u00c1LN\u00cd N\u00c1STAVBY MALACKY / ov\u00e1ln\u00e1 p\u0159evodovka"
];

const RIV_ITEMS = [
  { name: "AMBRA", desc: "\u0158ada AMBRA", search: "AMBRA" },
  { name: "ACQUA MARINA", desc: "P\u0159\u00edslu\u0161enstv\u00ed", search: "ACQUA MARINA" },
  { name: "CENTURION", desc: "\u0158ada CENTURION", search: "CENTURION" },
  { name: "GIADA", desc: "\u0158ada GIADA", search: "GIADA" },
  { name: "GOLD", desc: "\u0158ada GOLD", search: "GOLD" },
  { name: "OCEAN", desc: "\u0158ada OCEAN", search: "OCEAN" },
  { name: "OPALE", desc: "\u0158ada OPALE", search: "OPALE" },
  { name: "PERLA", desc: "Standartn\u00ed", search: "PERLA" },
  { name: "SMERALDO", desc: "P\u0159\u00edslu\u0161enstv\u00ed", search: "SMERALDO" },
  { name: "TURCHESE", desc: "\u0160oup\u011b p\u00e1kov\u00e9", search: "TURCHESE" },
  { name: "ZAFFIRO", desc: "N\u00e1dr\u017ee", search: "ZAFFIRO" },
];

const THEME_ORANGE = '#f57c00'; 
const THEME_GREEN = '#1a6b2f';   
const THEME_GREEN_DARK = '#0d4a1c'; 

const normalizeString = (str) => str ? str.replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim() : '';

export default function App() {
  const { width } = useWindowDimensions();
  const isWeb = width > 768; 
  const isMobile = width <= 480;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('V\u0161e');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isGuideModalVisible, setGuideModalVisible] = useState(false);

  const categories = useMemo(() => {
    const normalizedOrder = PREFERRED_ORDER.map(normalizeString);
    let uniqueCats = [...new Set(productsData.map(item => normalizeString(item.category || item.c)))].filter(Boolean);
    uniqueCats.sort((a, b) => {
      const indexA = normalizedOrder.indexOf(a);
      const indexB = normalizedOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });
    return ['V\u0161e', ...uniqueCats];
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = productsData.filter(item => {
      const searchLower = searchQuery.toLowerCase();
      const nameMatch = (item.name || item.n || "").toLowerCase().includes(searchLower);
      const subMatch = (item.subtitle || item.s) ? (item.subtitle || item.s).toLowerCase().includes(searchLower) : false;
      const catMatch = (item.category || item.c || "").toLowerCase().includes(searchLower);
      const matchesSearch = nameMatch || subMatch || catMatch;
      const itemCat = normalizeString(item.category || item.c);
      const matchesCategory = selectedCategory === 'V\u0161e' || itemCat === normalizeString(selectedCategory);
      return matchesSearch && matchesCategory;
    });

    if (selectedCategory === 'V\u0161e' && searchQuery === '') {
      const unique = [];
      const seenUrls = new Set();
      for (const item of filtered) {
        const url = item.url || item.u;
        if (!seenUrls.has(url)) { seenUrls.add(url); unique.push(item); }
      }
      filtered = unique;
    }
    return filtered.sort((a, b) => (a.name || a.n || "").localeCompare(b.name || b.n || ""));
  }, [searchQuery, selectedCategory]);

  const openWebpage = (url) => { if(url) Linking.openURL(url); };
  const openEmail = (email) => { Linking.openURL("mailto:" + email); };
  const openWhatsApp = () => { Linking.openURL('https://api.whatsapp.com/send/?phone=420731155789&text&type=phone_number&app_absent=0'); };
  const handleReset = () => { setSearchQuery(''); setSelectedCategory('V\u0161e'); setSelectedProduct(null); };
  const handleRivClick = (searchTerm) => { setSelectedCategory('V\u0161e'); setSearchQuery(searchTerm); };

  const renderListHeader = () => (
    <View style={styles.headerWrapper}>
      
      {/* 1. TOP BAR */}
      <View style={styles.topBar}>
        <View style={styles.topBarContacts}>
          <TouchableOpacity style={styles.topBarItem} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={14} color="white" />
            <Text style={styles.topBarText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBarItem} onPress={() => openEmail('info@fimas.cz')}>
            <Ionicons name="mail" size={14} color="white" />
            <Text style={styles.topBarText}>info@fimas.cz</Text>
          </TouchableOpacity>
          {isWeb && (
            <View style={styles.topBarItem}>
              <Ionicons name="person" size={14} color="white" />
              <Text style={styles.topBarText}>Autor: Pavel Jur\u00e1\u010dek</Text>
            </View>
          )}
        </View>
      </View>

      {/* 2. ZELEN\u00c1 HLAVI\u010cKA S LOGEM, TEXTEM A QR K\u00d3DEM */}
      <View style={styles.greenHeaderBar}>
        <View style={[styles.greenHeaderInner, isMobile && { flexDirection: 'column', alignItems: 'center' }]}>
          
          <View style={[styles.logoCard, isMobile && { marginBottom: 15 }]}>
            <Image source={require('./logo.jpg')} style={styles.logoImage} />
          </View>

          <View style={[styles.headerTextContainer, isMobile && { marginBottom: 15 }]}>
            <Text style={[styles.mainTitleWhite, isMobile && { fontSize: 28 }]}>FIMAS s.r.o.</Text>
            <Text style={[styles.subTitleWhite, isMobile && { fontSize: 16 }]}>V\u0160E PRO FEK\u00c1LN\u00cd N\u00c1STAVBY</Text>
          </View>

          <View style={styles.qrCard}>
            <Text style={styles.qrText}>ST\u00c1HNOUT APLIKACI</Text>
            <Image source={require('./qr.jpeg')} style={styles.qrImage} />
          </View>

        </View>
      </View>

      {/* 3. DEKORATIVN\u00cd ZLATAV\u00dd PRUH */}
      <ImageBackground source={require('./pozadi.png')} style={styles.heroBackgroundBanner} resizeMode="cover">
        <View style={styles.heroOverlayBanner}></View>
      </ImageBackground>

      {/* 4. HLAVN\u00cd OBSAH */}
      <View style={styles.contentSection}>
        
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={{ marginRight: 10 }} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Hledat d\u00edl, \u010d\u00edslo nebo kategorii..." 
            value={searchQuery} 
            onChangeText={setSearchQuery} 
            placeholderTextColor="#999" 
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.categoryPickerButton} onPress={() => setCategoryModalVisible(true)}>
          <Ionicons name="list" size={24} color="white" />
          <View style={styles.categoryPickerTextContainer}>
             <Text style={styles.categoryPickerLabel}>VYBRAN\u00c1 KATEGORIE:</Text>
             <Text style={styles.categoryPickerValue} numberOfLines={1}>{selectedCategory}</Text>
          </View>
          <Ionicons name="chevron-down" size={24} color="white" />
        </TouchableOpacity>

        {/* ZELEN\u00dd RIV OBD\u00c9LN\u00cdK */}
        <View style={styles.rivContainer}>
          <View style={[styles.rivContainerHeader, isMobile && { flexDirection: 'column', alignItems: 'center', textAlign: 'center' }]}>
            <Image source={require('./logoRIV.png')} style={[styles.rivLogoImageLarge, isMobile && { marginRight: 0, marginBottom: 10 }]} />
            <Text style={[styles.rivContainerTitle, isMobile && { textAlign: 'center' }]}>RIV Velatta: \u0160pi\u010dkov\u00e9 italsk\u00e9 armatury s tradic\u00ed</Text>
          </View>
          
          <View style={styles.rivGrid}>
            {RIV_ITEMS.map((item, idx) => (
              <TouchableOpacity
                key={item.name}
                style={[styles.rivCard, { width: isWeb ? '23%' : '47%' }]}
                onPress={() => handleRivClick(item.search)}
              >
                <Text style={styles.rivName}>{item.name}</Text>
                <Text style={styles.rivDesc} numberOfLines={1}>{item.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedProduct ? (
        <ScrollView style={styles.detailScroll} contentContainerStyle={styles.detailContent}>
          <Image source={{ uri: selectedProduct.image || selectedProduct.i }} style={styles.detailImage} />
          <Text style={styles.detailName}>{selectedProduct.name || selectedProduct.n}</Text>
          {(selectedProduct.subtitle || selectedProduct.s) ? <Text style={styles.detailSubtitle}>{selectedProduct.subtitle || selectedProduct.s}</Text> : null}
          <Text style={styles.detailPrice}>{selectedProduct.price || selectedProduct.p}</Text>
          <Text style={[styles.detailStock, { color: (selectedProduct.stock || selectedProduct.k).toLowerCase().includes('skladem') ? '#2e7d32' : '#ff9900' }]}>{selectedProduct.stock || selectedProduct.k}</Text>
          <Text style={styles.detailDescriptionLabel}>Popis produktu:</Text>
          <Text style={styles.detailDescription}>{selectedProduct.description || ("Kategorie: " + (selectedProduct.category || selectedProduct.c))}</Text>
          <TouchableOpacity style={styles.buyButton} onPress={() => openWebpage(selectedProduct.url || selectedProduct.u)}>
            <Text style={styles.buyButtonText}>Koupit na e-shopu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedProduct(null)}>
            <Text style={styles.backButtonText}>{"\u2190"} Zp\u011bt na seznam</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.mainContentWrapper}>
          <FlatList
            ListHeaderComponent={renderListHeader}
            data={filteredProducts}
            keyExtractor={(item, index) => (item.id || index).toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
            numColumns={isWeb ? 2 : 1}
            key={isWeb ? '2-cols' : '1-col'}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.card, isWeb && { flex: 1, marginHorizontal: 10 }]} onPress={() => setSelectedProduct(item)}>
                <Image source={{ uri: item.image || item.i }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name || item.n}</Text>
                  {(item.subtitle || item.s) ? <Text style={styles.subtitle}>{item.subtitle || item.s}</Text> : null}
                  <Text style={styles.price}>{item.price || item.p}</Text>
                  <Text style={[styles.stock, { color: (item.stock || item.k).toLowerCase().includes('skladem') ? '#2e7d32' : '#ff9900' }]}>{item.stock || item.k}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#ccc" style={{alignSelf: 'center'}} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>Nebyly nalezeny \u017e\u00e1dn\u00e9 d\u00edly.</Text>}
            ListFooterComponent={
              <View style={styles.footer}>
                <Text style={styles.footerText}>{"\u00A9"} 2024 FIMAS s.r.o. - V\u0161echna pr\u00e1va vyhrazena.</Text>
                {!isWeb && <Text style={styles.footerText}>Autor: Pavel Jur\u00e1\u010dek</Text>}
              </View>
            }
          />
        </View>
      )}

      {/* VYCENTROVAN\u00c1 PLOVOUC\u00cd TLA\u010c\u00cdTKA */}
      <View style={styles.floatingBar}>
        <View style={styles.floatingBarInner}>
          <TouchableOpacity style={styles.fabBlue} onPress={handleReset}>
            <Ionicons name="refresh" size={18} color="white" />
            <Text style={styles.fabText}>OBNOVIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabOrange} onPress={() => setGuideModalVisible(true)}>
            <Ionicons name="information-circle" size={18} color="white" />
            <Text style={styles.fabText}>N\u00c1VOD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabWhatsApp} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={18} color="white" />
            <Text style={styles.fabText}>WHATSAPP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={isCategoryModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Vyberte kategorii</Text>
              <TouchableOpacity onPress={() => setCategoryModalVisible(false)}><Ionicons name="close-circle" size={32} color="#e60000" /></TouchableOpacity>
            </View>
            <FlatList
              data={categories}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => { setSelectedCategory(item); setCategoryModalVisible(false); }}>
                  <Text style={[styles.modalItemText, selectedCategory === item && styles.modalItemTextActive]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={isGuideModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentGuide}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>N\u00e1vod k aplikaci</Text>
              <TouchableOpacity onPress={() => setGuideModalVisible(false)}><Ionicons name="close-circle" size={32} color="#e60000" /></TouchableOpacity>
            </View>
            <ScrollView style={styles.guideScroll} contentContainerStyle={styles.guideContent}>
              <Image source={require('./qr.jpeg')} style={styles.guideQrImage} />
              <Text style={styles.guideParagraph}>V\u00edtejte v katalogu <Text style={styles.bold}>V\u0161e pro fek\u00e1ln\u00ed n\u00e1stavby</Text>!{"\n\n"}Tato aplikace slou\u017e\u00ed k rychl\u00e9mu vyhled\u00e1v\u00e1n\u00ed n\u00e1hradn\u00edch d\u00edl\u016f. Po nalezen\u00ed d\u00edlu se jedn\u00edm kliknut\u00edm dostanete na e-shop k n\u00e1kupu.</Text>
              <Text style={styles.guideSectionTitle}>{"\uD83D\uDCF2"} Jak si ulo\u017eit aplikaci na plochu mobilu:</Text>
              <View style={styles.guidePlatformBlock}><Ionicons name="logo-android" size={20} color="#3DDC84" style={styles.guideIconInline} /><Text style={styles.guidePlatformHeader}>Pro Android (Chrome):</Text></View>
              <Text style={styles.guideStep}>1. Otev\u0159ete vseprofekaly.cz{"\n"}2. Klikn\u011bte na ikonu t\u0159\u00ed te\u010dek.{"\n"}3. Vyberte P\u0159idat na domovskou obrazovku.</Text>
              <View style={styles.guidePlatformBlock}><Ionicons name="logo-apple" size={20} color="#555" style={styles.guideIconInline} /><Text style={styles.guidePlatformHeader}>Pro iPhone (Safari):</Text></View>
              <Text style={styles.guideStep}>1. Otev\u0159ete vseprofekaly.cz{"\n"}2. Klikn\u011bte na ikonu sd\u00edlen\u00ed.{"\n"}3. Vyberte P\u0159idat na plochu.</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f0' },
  mainContentWrapper: { flex: 1, width: '100%', maxWidth: 1200, alignSelf: 'center' },
  headerWrapper: { width: '100%' },
  
  /* TOP BAR */
  topBar: { backgroundColor: '#111', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 8, flexWrap: 'wrap' },
  topBarContacts: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 20 },
  topBarItem: { flexDirection: 'row', alignItems: 'center' },
  topBarText: { color: '#ccc', fontSize: 12, marginLeft: 6 },
  
  /* ZELEN\u00c1 HLAVI\u010cKA S LOGEM, TEXTEM A QR */
  greenHeaderBar: { backgroundColor: THEME_GREEN_DARK, paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 3, borderBottomColor: THEME_ORANGE },
  greenHeaderInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, width: '100%', alignSelf: 'center' },
  
  logoCard: { backgroundColor: 'white', padding: 8, borderRadius: 8, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2 },
  logoImage: { width: 110, height: 60, resizeMode: 'contain' },
  
  headerTextContainer: { flex: 1, alignItems: 'center', paddingHorizontal: 15 },
  mainTitleWhite: { color: 'white', fontSize: 36, fontWeight: '900', letterSpacing: 1.5, textAlign: 'center' },
  subTitleWhite: { color: 'white', fontSize: 18, fontWeight: '700', letterSpacing: 1, textAlign: 'center', marginTop: 4 },

  qrCard: { backgroundColor: 'white', padding: 6, borderRadius: 8, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2 },
  qrText: { fontSize: 9, fontWeight: 'bold', color: THEME_GREEN_DARK, marginBottom: 4 },
  qrImage: { width: 60, height: 60, resizeMode: 'contain' },
  
  /* V\u011aT\u0160\u00cd ZLATAV\u00dd HERO PRUH */
  heroBackgroundBanner: { width: '100%', height: 250 }, 
  heroOverlayBanner: { flex: 1, backgroundColor: 'rgba(218, 165, 32, 0.6)' },
  
  contentSection: { padding: 15, maxWidth: 1200, width: '100%', alignSelf: 'center', paddingTop: 20 },
  
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 15, height: 50, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, borderWidth: 1, borderColor: '#e0e0e0' },
  searchInput: { flex: 1, fontSize: 16, color: '#333', outlineStyle: 'none' },

  categoryPickerButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: THEME_GREEN, marginBottom: 25, padding: 14, borderRadius: 12, elevation: 3 },
  categoryPickerTextContainer: { flex: 1, marginLeft: 12 },
  categoryPickerLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  categoryPickerValue: { color: 'white', fontSize: 17, fontWeight: 'bold' },

  /* ZELEN\u00dd RIV OBD\u00c9LN\u00cdK */
  rivContainer: { backgroundColor: THEME_GREEN_DARK, borderRadius: 20, padding: 20, elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, marginBottom: 15 },
  rivContainerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.4)' },
  rivLogoImageLarge: { width: 140, height: 60, resizeMode: 'contain', marginRight: 15 },
  rivContainerTitle: { fontSize: 20, fontWeight: '800', color: 'white', flexShrink: 1 },
  
  rivGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  
  rivCard: { backgroundColor: 'white', borderRadius: 15, paddingVertical: 12, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15 },
  rivName: { fontSize: 14, fontWeight: '800', marginBottom: 4, textAlign: 'center', color: THEME_GREEN_DARK },
  rivDesc: { fontSize: 11, color: '#555', textAlign: 'center' },
  
  card: { flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 10, marginBottom: 10, padding: 12, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 15, backgroundColor: '#f9f9f9', resizeMode: 'contain' },
  info: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 12, color: '#666', marginBottom: 5, fontStyle: 'italic' },
  price: { fontSize: 16, color: '#e60000', fontWeight: 'bold' },
  stock: { fontSize: 12, marginTop: 4, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#666' },
  
  detailScroll: { flex: 1, backgroundColor: 'white' },
  detailContent: { padding: 20, paddingBottom: 100, maxWidth: 800, alignSelf: 'center', width: '100%' }, 
  detailImage: { width: '100%', height: 250, resizeMode: 'contain', backgroundColor: '#f9f9f9', borderRadius: 12, marginBottom: 20 },
  detailName: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  detailSubtitle: { fontSize: 16, color: '#666', marginBottom: 15, fontStyle: 'italic' },
  detailPrice: { fontSize: 24, color: '#e60000', fontWeight: 'bold', marginBottom: 5 },
  detailStock: { fontSize: 16, marginBottom: 25, fontWeight: 'bold' },
  detailDescriptionLabel: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 8, color: '#333' },
  detailDescription: { fontSize: 16, color: '#555', lineHeight: 24, marginBottom: 35 },
  buyButton: { backgroundColor: '#2e7d32', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 15, elevation: 4 },
  buyButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  backButton: { backgroundColor: '#e0e0e0', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  backButtonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  
  footer: { marginTop: 30, paddingBottom: 40, alignItems: 'center' },
  footerText: { fontSize: 12, color: '#888', marginBottom: 4 },
  
  floatingBar: { position: 'absolute', bottom: 20, width: '100%', alignItems: 'center', zIndex: 100 },
  floatingBarInner: { flexDirection: 'row', justifyContent: 'center' },
  fabText: { color: 'white', fontWeight: 'bold', fontSize: 12, marginLeft: 6 },
  fabBlue: { backgroundColor: '#0277bd', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 25, flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3 },
  fabOrange: { backgroundColor: THEME_ORANGE, paddingHorizontal: 15, paddingVertical: 12, borderRadius: 25, flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3 },
  fabWhatsApp: { backgroundColor: '#25D366', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 25, flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, flexShrink: 1, maxHeight: '85%', padding: 20, paddingBottom: 40 },
  modalContentGuide: { backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, flexShrink: 1, maxHeight: '90%', padding: 20, paddingBottom: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#2e7d32' },
  modalItem: { paddingVertical: 16, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f5' },
  modalItemText: { fontSize: 17, color: '#333' },
  modalItemTextActive: { color: '#2e7d32', fontWeight: 'bold', fontSize: 18 },
  guideScroll: { flexGrow: 1 },
  guideContent: { paddingBottom: 30 },
  bold: { fontWeight: 'bold', color: '#222' },
  guideQrImage: { width: 180, height: 180, resizeMode: 'contain', alignSelf: 'center', marginVertical: 15 },
  guideParagraph: { fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 15, textAlign: 'center' },
  guideSectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32', marginTop: 15, marginBottom: 20, textAlign: 'center' },
  guidePlatformBlock: { flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 8, paddingLeft: 5 },
  guideIconInline: { marginRight: 8 },
  guidePlatformHeader: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  guideStep: { fontSize: 15, color: '#555', lineHeight: 24, paddingLeft: 10, marginBottom: 10 }
});

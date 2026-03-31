import React, { useState, useMemo } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView, Linking, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import productsData from './data.json';

const PREFERRED_ORDER = [
  "RIV ITALY", "RIV ITALY  / ACQUA MARINA uzávěry plovákové", "RIV ITALY  / AMBRA ventily podtlakové", "RIV ITALY  / CENTURION šoupě velkokapacitní", "RIV ITALY  / GIADA sifony", "RIV ITALY  / GOLD  uzávěry plovákové", "RIV ITALY  / KAPÁTKO mazání vývěvy", "RIV ITALY  / KATALOG RIV", "RIV ITALY  / OCEAN sifony", "RIV ITALY  / OPALE ventily přetlakové", "RIV ITALY  / PERLA šoupě standartní", "RIV ITALY  / SIFON", "RIV ITALY  / SMERALDO příslušenství šoupat", "RIV ITALY  / STAVOZNAK", "RIV ITALY  / TURCHESE šoupě pákové", "RIV ITALY  / Uzávěr PLOVÁKOVÝ", "RIV ITALY  / Ventil PODTLAKOVÝ", "RIV ITALY  / Ventil POJISTNÝ", "RIV ITALY  / ZAFFIRO příslušenství nádrží", "RIV ITALY  / ŠOUPĚ a příslušenství",
  "FEKÁL HTS 100", "FEKÁL HTS 100 / Brzdy", "FEKÁL HTS 100 / Katalog", "FEKÁL HTS 100 / Koncovky PERROT", "FEKÁL HTS 100 / Oko tažné", "FEKÁL HTS 100 / Pohon vývěvy a díly vývěvy", "FEKÁL HTS 100 / Stavoznak", "FEKÁL HTS 100 / Uzávěr horní", "FEKÁL HTS 100 / Uzávěr plovákový", "FEKÁL HTS 100 / Uzávěr zadní", "FEKÁL HTS 100 / Vahadlo a díly nápravy", "FEKÁL HTS 100 / Vývěva - náhrada původní",
  "FEKÁLNÍ NÁSTAVBY MALACKY / Díly nádrží - uzávěry", "FEKÁLNÍ NÁSTAVBY MALACKY / Díly podvozků - vahadla", "FEKÁLNÍ NÁSTAVBY MALACKY / Hydraulika - rozvaděče", "FEKÁLNÍ NÁSTAVBY MALACKY / Kapotáž", "FEKÁLNÍ NÁSTAVBY MALACKY / Náhon kompresoru", "FEKÁLNÍ NÁSTAVBY MALACKY / Ovládání savice", "FEKÁLNÍ NÁSTAVBY MALACKY / Panel ovládací", "FEKÁLNÍ NÁSTAVBY MALACKY / Potrubí kompresoru", "FEKÁLNÍ NÁSTAVBY MALACKY / Převodovky, hřídele, kola", "FEKÁLNÍ NÁSTAVBY MALACKY / Rozvaděče", "FEKÁLNÍ NÁSTAVBY MALACKY / Rozvod po stroji", "FEKÁLNÍ NÁSTAVBY MALACKY / Savice a koncovky", "FEKÁLNÍ NÁSTAVBY MALACKY / Stavoznak", "FEKÁLNÍ NÁSTAVBY MALACKY / Těsnění fekálních nástaveb", "FEKÁLNÍ NÁSTAVBY MALACKY / Uchycení nádrže", "FEKÁLNÍ NÁSTAVBY MALACKY / Uzávěr boční", "FEKÁLNÍ NÁSTAVBY MALACKY / Uzávěr plovákový", "FEKÁLNÍ NÁSTAVBY MALACKY / Uzávěr vrchní", "FEKÁLNÍ NÁSTAVBY MALACKY / Uzávěr zadní", "FEKÁLNÍ NÁSTAVBY MALACKY / Ventily, šoupata, manuovakuo.", "FEKÁLNÍ NÁSTAVBY MALACKY / Vývěvy - díly, mazání", "FEKÁLNÍ NÁSTAVBY MALACKY / hranatá převodovka", "FEKÁLNÍ NÁSTAVBY MALACKY / oválná převodovka"
];

const normalizeString = (str) => {
  if (!str) return '';
  return str.replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Vše');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isGuideModalVisible, setGuideModalVisible] = useState(false);

  const categories = useMemo(() => {
    const normalizedOrder = PREFERRED_ORDER.map(normalizeString);
    let uniqueCats = [...new Set(productsData.map(item => normalizeString(item.category)))].filter(Boolean);
    uniqueCats.sort((a, b) => {
      const indexA = normalizedOrder.indexOf(a);
      const indexB = normalizedOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });
    return ['Vše', ...uniqueCats];
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = productsData.filter(item => {
      const searchLower = searchQuery.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(searchLower);
      const subMatch = item.subtitle ? item.subtitle.toLowerCase().includes(searchLower) : false;
      const matchesSearch = nameMatch || subMatch;
      const matchesCategory = selectedCategory === 'Vše' || normalizeString(item.category) === normalizeString(selectedCategory);
      return matchesSearch && matchesCategory;
    });

    if (selectedCategory === 'Vše') {
      const unique = [];
      const seenUrls = new Set();
      for (const item of filtered) {
        if (!seenUrls.has(item.url)) {
          seenUrls.add(item.url);
          unique.push(item);
        }
      }
      filtered = unique;
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedCategory]);

  const openWebpage = (url) => { if(url) Linking.openURL(url); };
  const openEmail = (email) => { Linking.openURL(`mailto:${email}`); };
  const openWhatsApp = () => { Linking.openURL('https://api.whatsapp.com/send/?phone=420731155789&text&type=phone_number&app_absent=0'); };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('Vše');
    setSelectedProduct(null);
  };

  return (
    <View style={styles.container}>
      {/* Hlavička - integrováno přímo sem */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>VŠE PRO FEKÁLNÍ NÁSTAVBY</Text>
        <Text style={styles.headerSubtitle}>SPECIALISTÉ NA ZEMĚDĚLSKOU TECHNIKU</Text>
        <Image source={require('./logo.jpg')} style={styles.logoImage} />
        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactBadge} onPress={() => openWebpage('https://vseprofekaly.cz')}>
            <Ionicons name="globe-outline" size={16} color="#1b5e20" />
            <Text style={styles.contactBadgeText}>vseprofekaly.cz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactBadge} onPress={() => openEmail('info@fimas.cz')}>
            <Ionicons name="mail-outline" size={16} color="#1b5e20" />
            <Text style={styles.contactBadgeText}>info@fimas.cz</Text>
          </TouchableOpacity>
        </View>
      </View>

      {selectedProduct ? (
        <ScrollView style={styles.detailScroll} contentContainerStyle={styles.detailContent}>
          <Image source={{ uri: selectedProduct.image }} style={styles.detailImage} />
          <Text style={styles.detailName}>{selectedProduct.name}</Text>
          {selectedProduct.subtitle ? <Text style={styles.detailSubtitle}>{selectedProduct.subtitle}</Text> : null}
          <Text style={styles.detailPrice}>{selectedProduct.price}</Text>
          <Text style={[styles.detailStock, { color: selectedProduct.stock.toLowerCase().includes('skladem') ? '#2e7d32' : '#ff9900' }]}>{selectedProduct.stock}</Text>
          <Text style={styles.detailDescriptionLabel}>Popis produktu:</Text>
          <Text style={styles.detailDescription}>{selectedProduct.description}</Text>
          <TouchableOpacity style={styles.buyButton} onPress={() => openWebpage(selectedProduct.url)}>
            <Text style={styles.buyButtonText}>Koupit na e-shopu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedProduct(null)}>
            <Text style={styles.backButtonText}>← Zpět na seznam</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput style={styles.searchInput} placeholder="Hledat díl nebo číslo..." value={searchQuery} onChangeText={setSearchQuery} />
          </View>

          <TouchableOpacity style={styles.categoryPickerButton} onPress={() => setCategoryModalVisible(true)}>
            <Ionicons name="list" size={24} color="white" />
            <View style={styles.categoryPickerTextContainer}>
               <Text style={styles.categoryPickerLabel}>VYBRANÁ KATEGORIE:</Text>
               <Text style={styles.categoryPickerValue} numberOfLines={1}>{selectedCategory}</Text>
            </View>
            <Ionicons name="chevron-down" size={24} color="white" />
          </TouchableOpacity>

          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => setSelectedProduct(item)}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={[styles.stock, { color: item.stock.toLowerCase().includes('skladem') ? '#2e7d32' : '#ff9900' }]}>{item.stock}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#ccc" style={{alignSelf: 'center'}} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>Nebyly nalezeny žádné díly.</Text>}
            ListFooterComponent={
              <View style={styles.footer}>
                <Text style={styles.footerText}>© 2024 Vše pro fekální nástavby</Text>
                <Text style={styles.footerAuthor}>Katalog vytvořil: Pavel Juráček</Text>
              </View>
            }
          />
        </>
      )}

      <View style={styles.floatingBar}>
        <TouchableOpacity style={styles.fabBlue} onPress={handleReset}>
          <Ionicons name="refresh" size={18} color="white" />
          <Text style={styles.fabText}>OBNOVIT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fabOrange} onPress={() => setGuideModalVisible(true)}>
          <Ionicons name="information-circle" size={18} color="white" />
          <Text style={styles.fabText}>NÁVOD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fabWhatsApp} onPress={openWhatsApp}>
          <Ionicons name="logo-whatsapp" size={18} color="white" />
          <Text style={styles.fabText}>WHATSAPP</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isCategoryModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Vyberte kategorii</Text>
              <TouchableOpacity onPress={() => setCategoryModalVisible(false)}>
                <Ionicons name="close-circle" size={32} color="#e60000" />
              </TouchableOpacity>
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
              <Text style={styles.modalTitle}>Návod k aplikaci</Text>
              <TouchableOpacity onPress={() => setGuideModalVisible(false)}>
                <Ionicons name="close-circle" size={32} color="#e60000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.guideScroll} contentContainerStyle={styles.guideContent}>
              <Image source={require('./qr.jpeg')} style={styles.guideQrImage} />
              <Text style={styles.guideParagraph}>
                Vítejte v katalogu <Text style={styles.bold}>Vše pro fekální nástavby</Text>!{"\n\n"}
                Tato aplikace slouží k rychlému vyhledávání náhradních dílů na vašem mobilním telefonu. Po nalezení dílu se jedním kliknutím dostanete přímo na e-shop k nákupu.
              </Text>
              <Text style={styles.guideSectionTitle}>📲 Jak si uložit aplikaci na plochu mobilu:</Text>
              <View style={styles.guidePlatformBlock}>
                <Ionicons name="logo-android" size={20} color="#3DDC84" style={styles.guideIconInline} />
                <Text style={styles.guidePlatformHeader}>Pro telefony Android (Chrome):</Text>
              </View>
              <Text style={styles.guideStep}>
                1. Otevřete si v prohlížeči adresu <Text style={styles.bold}>vseprofekaly.cz</Text>{"\n"}
                2. Vpravo nahoře klikněte na ikonu <Text style={styles.bold}>tří teček</Text> (Menu).{"\n"}
                3. Vyberte možnost <Text style={styles.bold}>Přidat na domovskou obrazovku</Text>.{"\n"}
                4. Potvrďte kliknutím na <Text style={styles.bold}>Přidat</Text>. Na ploše se vám objeví naše ikonka!
              </Text>
              <View style={styles.guidePlatformBlock}>
                <Ionicons name="logo-apple" size={20} color="#555" style={styles.guideIconInline} />
                <Text style={styles.guidePlatformHeader}>Pro telefony iPhone (Safari):</Text>
              </View>
              <Text style={styles.guideStep}>
                1. Otevřete si v prohlížeči Safari adresu <Text style={styles.bold}>vseprofekaly.cz</Text>{"\n"}
                2. Dole uprostřed obrazovky klikněte na <Text style={styles.bold}>ikonu sdílení</Text> (čtvereček se šipkou nahoru).{"\n"}
                3. Popojeďte v nabídce o kousek níže a vyberte <Text style={styles.bold}>Přidat na plochu</Text> (ikonka s +, Add to Home Screen).{"\n"}
                4. Potvrďte kliknutím na <Text style={styles.bold}>Přidat</Text> vpravo nahoře.
              </Text>
              <Text style={styles.guideParagraphEnd}>{"\n"}Díky tomu budete mít náš katalog neustále po ruce jako běžnou aplikaci.</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f0' },
  header: { backgroundColor: '#2e7d32', paddingTop: 50, paddingBottom: 25, paddingHorizontal: 15, alignItems: 'center', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, elevation: 8 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: '900', letterSpacing: 1.5 },
  headerSubtitle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 15 },
  logoImage: { width: '90%', height: 70, resizeMode: 'contain', marginBottom: 20 },
  contactRow: { flexDirection: 'row', justifyContent: 'center', width: '100%' },
  contactBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, marginHorizontal: 8, elevation: 3 },
  contactBadgeText: { color: '#1b5e20', fontSize: 13, fontWeight: 'bold', marginLeft: 6 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, paddingBottom: 5 },
  searchIcon: { position: 'absolute', left: 20, top: 20, zIndex: 2 },
  searchInput: { flex: 1, backgroundColor: 'white', padding: 12, paddingLeft: 40, borderRadius: 15, fontSize: 16, elevation: 2 },
  categoryPickerButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1b5e20', marginHorizontal: 10, marginBottom: 10, padding: 12, borderRadius: 15, elevation: 3 },
  categoryPickerTextContainer: { flex: 1, marginLeft: 10 },
  categoryPickerLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  categoryPickerValue: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  card: { flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 10, marginBottom: 10, padding: 12, borderRadius: 15, elevation: 2 },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 15, backgroundColor: '#f9f9f9', resizeMode: 'contain' },
  info: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 5, fontStyle: 'italic' },
  price: { fontSize: 16, color: '#e60000', fontWeight: 'bold' },
  stock: { fontSize: 12, marginTop: 4, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#666' },
  detailScroll: { flex: 1, backgroundColor: 'white' },
  detailContent: { padding: 20, paddingBottom: 100 }, 
  detailImage: { width: '100%', height: 250, resizeMode: 'contain', backgroundColor: '#f9f9f9', borderRadius: 15, marginBottom: 20 },
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
  footerAuthor: { fontSize: 13, color: '#2e7d32', fontWeight: 'bold' },
  floatingBar: { position: 'absolute', bottom: 20, left: 10, right: 10, flexDirection: 'row', justifyContent: 'space-between', zIndex: 100 },
  fabText: { color: 'white', fontWeight: 'bold', fontSize: 12, marginLeft: 6 },
  fabBlue: { backgroundColor: '#0277bd', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 4 }, android: { elevation: 6 } }), flex: 1, marginHorizontal: 4, paddingVertical: 12, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  fabOrange: { backgroundColor: '#f57c00', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 4 }, android: { elevation: 6 } }), flex: 1, marginHorizontal: 4, paddingVertical: 12, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  fabWhatsApp: { backgroundColor: '#25D366', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 4 }, android: { elevation: 6 } }), flex: 1, marginHorizontal: 4, paddingVertical: 12, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
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
  guideStep: { fontSize: 15, color: '#555', lineHeight: 24, paddingLeft: 10, marginBottom: 10 },
  guideParagraphEnd: { fontSize: 15, color: '#666', fontStyle: 'italic', textAlign: 'center' }
});

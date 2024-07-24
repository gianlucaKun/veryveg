import { BarCodeScanner } from "expo-barcode-scanner";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Vibration,
} from "react-native";
import Bottone from "./custom/bottone";
import React, { useState, useEffect, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import GuideCamera from "@/assets/cameraGuide/guideCamera";
import SchedaProdotto from "./schede/SchedaProdotto";
import SchedaProdottoTimeLine, {
  scalaColore,
} from "./schede/SchedaProdottoTimeline";
import ProductForm from "./forms/ProductForm";
import {
  getProductByBarCode,
  addProduct,
  getProductFromApi,
} from "@/services/ProductAPI"; // Importa la funzione per aggiungere il prodotto
import { prodotto, prodottoveryveg } from "@/models/products";

const Scanner: React.FC = () => {
  const [permission, setPermission] = useState<boolean | null>(null);
  const [scanner, setScanner] = useState<boolean>(false);
  const [prodotto, setProdotto] = useState<prodottoveryveg>();
  const [camera, setCamera] = useState<boolean>(true);
  const [barCode, setBarCode] = useState<string | undefined>(undefined);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [lista, setLista] = useState<prodottoveryveg[]>([]); //lista ultimi codici scansionati
  const [addingProduct, setAddingProduct] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const scrollViewHeight = useRef(new Animated.Value(0)).current;

  // Valori animati per le transizioni di altezza, marginBottom e opacità
  const heightAnim = useRef(new Animated.Value(0)).current;
  const marginAnim = useRef(new Animated.Value(10)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(heightAnim, {
          toValue: camera ? 200 : 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(marginAnim, {
          toValue: camera ? 10 : 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(scrollViewHeight, {
          toValue: camera ? 360 : 560,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(opacityAnim, {
        toValue: camera ? 1 : 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, [camera, scrollViewHeight, heightAnim, marginAnim, opacityAnim]);

  if (permission === null) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Richiesta di autorizzazione della fotocamera</Text>
      </View>
    );
  }
  if (permission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Nessun accesso alla fotocamera</Text>
      </View>
    );
  }

  const handleBarCodeScanner = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (type.startsWith("org.gs1.EAN")) {
      if (data !== barCode) {
        if (addingProduct) {
          return;
        }

        setAddingProduct(true);

        try {
          // controlla se prodotto presente nel DB Mongo
          const product = await getProductByBarCode(data);

          if (product) {
            Vibration.vibrate(100);
            setLista((prevLista) => [...prevLista, product]);
            setProdotto(product);
            setBarCode(data);
            setNotFound(false);
          } else {
            // Se non trovato nel database, controlla l'API di Open Food Facts
            const apiProduct = await getProductFromApi(data);

            if (apiProduct && apiProduct.product) {
              const productFromApi = apiProduct.product;

              // Crea un oggetto conforme al tipo `prodottoveryveg`
              const newProduct: prodottoveryveg = {
                name: productFromApi.product_name || "",
                barcode: productFromApi.code || data,
                description: productFromApi.description || "",
                vegan: productFromApi.vegan === "yes",
                vegetarian: productFromApi.vegetarian === "yes",
                ingredients: productFromApi.ingredients_text
                  ? [{ name: productFromApi.ingredients_text }]
                  : [],
              };

              setLista((prevLista) => [...prevLista, newProduct]);
              setProdotto(newProduct);
              setBarCode(data);
              setNotFound(false);
              setFormVisible(true);

              // Aggiungi il prodotto al tuo database
              await addProduct(newProduct);
            } else {
              if (!notFound) {
                setNotFound(true);
                setProdotto(undefined);
                setBarCode(data);
                setFormVisible(true); // mostra il form quando il prodotto non viene trovato
              }
            }
          }
        } finally {
          setTimeout(() => {
            setAddingProduct(false);
          }, 1000);
        }
      }
    } else {
      setProdotto(undefined);
      setBarCode(undefined);
    }
  };

  const handleProductSubmit = async (newProduct: prodottoveryveg) => {
    try {
      await addProduct(newProduct); // Invio del prodotto al backend
      setLista((prevLista) => [...prevLista, newProduct]);
      setProdotto(newProduct);
      setNotFound(false);
      setFormVisible(false); // chiudi il form dopo l'aggiunta del prodotto
    } catch (error) {
      console.error("Errore durante l'aggiunta del prodotto:", error);
    }
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setNotFound(false);
    setCamera(true); // riapri la fotocamera quando il form è chiuso
  };

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      {formVisible ? (
        <ProductForm
          barcode={barCode!}
          onSubmit={handleProductSubmit}
          onClose={handleCloseForm}
        />
      ) : (
        <>
          <Animated.ScrollView
            style={[styles.scroll, { height: scrollViewHeight }]}
            showsVerticalScrollIndicator={false}
          >
            {lista.reverse().map((p, index) => (
              <SchedaProdottoTimeLine
                key={index}
                prodotto={p}
                colore={
                  scalaColore[
                    index >= scalaColore.length ? scalaColore.length - 1 : index
                  ]
                }
              />
            ))}
          </Animated.ScrollView>
          <View style={styles.container}>
            <SchedaProdotto prodotto={prodotto} isNew={notFound} />
            <Animated.View
              style={[
                styles.barCodeBox,
                { height: heightAnim, marginBottom: marginAnim },
              ]}
            >
              {camera && (
                <BarCodeScanner
                  onBarCodeScanned={handleBarCodeScanner}
                  style={StyleSheet.absoluteFillObject}
                />
              )}
            </Animated.View>
            {camera ? (
              <>
                <Animated.View style={{ opacity: opacityAnim }}>
                  <GuideCamera />
                </Animated.View>
                <Bottone
                  testo="Chiudi fotocamera"
                  icona={
                    <Feather name="camera-off" size={36} color="#926FFF" />
                  }
                  onClick={() => setCamera(false)}
                />
              </>
            ) : (
              <Bottone
                testo="Inizia a scansionare"
                icona={<Feather name="camera" size={36} color="#926FFF" />}
                onClick={() => setCamera(true)}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  barCodeBox: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.9,
    overflow: "hidden",
    borderRadius: 35,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#926FFF",
    padding: 10,
    borderRadius: 35,
  },
  scroll: {
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "column",
    position: "relative",
  },
});

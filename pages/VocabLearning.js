import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { APP_ENV_PRAKTYK_API_KEY, APP_ENV_PRAKTYK_API_LINK } from "@env";
import axios from "axios";
//For Loading Screen
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { CrossfadeImage } from 'react-native-crossfade-image';
//Async Function that fetches all the words and returns them
async function fetchVocabWords(gradeNo, categoryField) {
  const data = {
    grade: "grade" + gradeNo,
    field: categoryField,
  };

  try {
    const response = await axios.post(
      `${APP_ENV_PRAKTYK_API_LINK}/api/get/gradeVocabField`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": APP_ENV_PRAKTYK_API_KEY,
        },
      }
    );

    if (response && response.data && response.data.common_words) {
      const commonWords = response.data.common_words;
      const wordPairs = [];

      for (const englishWord in commonWords) {
        if (commonWords.hasOwnProperty(englishWord)) {
          const afrikaansWord = commonWords[englishWord];
          wordPairs.push({ english: englishWord, afrikaans: afrikaansWord });
        }
      }
      return wordPairs;
    } else {
      console.error("Error: No common_words data in the response.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

//Async Function that fetches image and returns url
async function fetchImage(englishWord) {
  const data = {
    imageName: englishWord,
  };

  try {
    const response = await axios.post(
      `${APP_ENV_PRAKTYK_API_LINK}/api/get/image`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": APP_ENV_PRAKTYK_API_KEY,
        },
      }
    );

    if (response && response.data) {
      const json = response.data;
      const imageurl = json.url;

      // setImageSource(imageurl);
      // setIsLoading(false); // Mark loading as complete
      return imageurl;
    } else {
      console.log("Error: No response data from the server.");
    }
  } catch (error) {
    console.error("Error:", error.message);
    // You can log more error details if needed: error.response, error.request, etc.
  }
}

export default function VocabLearning(props) {
  const navigation = useNavigation();

  const [afrikaansWord, setAfrikaansWord] = useState("Afrikaans Word");
  const [englishWord, setEnglishWord] = useState("English word");
  const [wordList, setWordList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isLoadingImage, setIsLoadingImage] = useState(true); // Track loading state
  const [imgurl, setImgurl] = useState("");
  const [imgCacheList ,setImgCacheList]= useState([]); // To cache images

  // THIS CODE IS FOR GETTING THE GRADE AND CATEGORY PASSED FROM THE PREVIOUS SCREEN
  const route = useRoute();

  // Retrieve the selectedGrade parameter from the route
  const selectedGrade = route.params?.selectedGrade || "Not Selected";
  const catergoryField = route.params?.catergoryField || "Not Selected";

  /* function that calls async fetch words function
   *It sets the wordlist with the words returned
   */
  const getwords = async () => {
    try {
      const swords = await fetchVocabWords(selectedGrade, catergoryField);
      setWordList(swords);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  /* function that calls  async fetch image function
   *Sets The image url to the one returned
   *Sets the Loading stage to false
   */
  const getimage = async () => {
    try {
      setIsLoadingImage(true);
      const iurl = await fetchImage(englishWord);
      setImgurl(iurl);
      setIsLoading(false); // Mark loading as complete
      setIsLoadingImage(false);
    } catch (error) {
      console.error("Error fetching words:", error);
      setIsLoading(false); // Mark loading as complete even on error
    }
  };

  //Function to update image cache List  and turn of loading on first time.
  const updateImageCache = async () => {
    //Fist image  is at 0 in Cachelist and Next image is at 1

    const nextIndex = currentIndex + 1 < wordList.length ? currentIndex + 1 : 0;
    // Check if the image for the next item is already in the cache
    const nextImageCache = imgCacheList[1];

    if (nextImageCache) {
      // If the image is in the cache, use it directly first and call for next one in mean time
      setImgurl(nextImageCache);
      setImgCacheList([ nextImageCache]);
      const nextImageUrl = await fetchImage(wordList[nextIndex].english);
      setImgCacheList([ nextImageCache, nextImageUrl]); //Set imagecachelist to to the current and next one.
      setIsLoading(false); // Mark loading as complete
    } 
    else{
        try{
          //First call the current one and set it then call for the next one in mean time
          const currentImageUrl = await fetchImage(wordList[currentIndex].english);
          setImgurl(currentImageUrl);
          setImgCacheList([ currentImageUrl]);
          const nextImageUrl = await fetchImage(wordList[nextIndex].english);
          setImgCacheList([ currentImageUrl, nextImageUrl]);
          setIsLoading(false); // Mark loading as complete
        }
        catch (error) {
          console.error("Error fetching words:", error);
          setIsLoading(false); // Mark loading as complete even on error
        }
    }
  };

  //useEffect that calls getwords function
  useEffect(() => {
    getwords();
  }, []);

  //useEffect to update Afrikaans and English word first time when wordList changes
  useEffect(() => {
    if (wordList && wordList.length > 0) {
      // const currentAfrikaansWord = wordList[currentIndex].afrikaans;
      setAfrikaansWord(wordList[0].afrikaans);
      setEnglishWord(wordList[0].english);
    }
  }, [wordList]);

  //Use effect to call update image first time.
  useEffect(() => {
    if(englishWord != "English word"){
      updateImageCache();
      
    }
  }, [englishWord]);

  // useEffect to update the image cache when the currentIndex changes
  useEffect(() => {
    if (wordList && wordList.length > 0) {
      updateImageCache();
    }
  }, [currentIndex]);

  /*Handles Translate Button
   *shows english text
   */
  const handleTranslateClick = () => {
    if (showEnglish) {
      setShowEnglish(false);
    } else {
      setShowEnglish(true);
      setEnglishWord(wordList[currentIndex].english);
    }
  };

  /*Handles Previous Button
   *Set current Index value
   *Sets  Afrikaans and  English words according to current index
   */
  const handlePrevClick = () => {
    const nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
    // setCurrentIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : 0));
    setCurrentIndex(nextIndex);
    setShowEnglish(false);
    setAfrikaansWord(wordList[nextIndex].afrikaans);
    setEnglishWord(wordList[nextIndex].english);
  };

  /*Handles Previous Button
   *Set current Index value
   *We use nextindex variable instead of directly using current index because setstate is async
   *Sets  Afrikaans and  English words according to current index
   *Hides the English text
   */
  const handleNextClick = () => {
    const nextIndex = currentIndex + 1 < wordList.length ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
    setShowEnglish(false);
    setAfrikaansWord(wordList[nextIndex].afrikaans);
    setEnglishWord(wordList[nextIndex].english);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isLoading   ? ( // Conditionally render loading indicator
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.purple700}
            size={"large"}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.selectedGradeText}>Grade: {selectedGrade}</Text>
          <Text style={styles.selectedCategoryText}>
            Category: {catergoryField}
          </Text>
          {/* {isLoadingImage  ? (
            <ActivityIndicator
            animating={true}
            color={MD2Colors.purple700}
            size={"large"}
          />
          ) : (
            <Animated.Image
              source={{
                uri: imgurl,
              }}
              style={[styles.imageStyle]}
              // style={[rotateYAnimatedStyle, styles.imageStyle]}
            />
            // <CrossfadeImage
            //   source={{
            //     uri: imgurl,
            //   }}
            //   style={[styles.imageStyle]}
            //   resizeMode="cover"
            //   // style={[rotateYAnimatedStyle, styles.imageStyle]}
            // />
          )} */}
          {/* Removed Loading for image , we now have just image */}
            <CrossfadeImage
              source={{
                uri: imgurl,
              }}
              style={[styles.imageStyle]}
              resizeMode="cover"
              duration={1500}
              blurRadius={showEnglish?30:0}
              // style={[rotateYAnimatedStyle, styles.imageStyle]}
              >
                {showEnglish &&(
                   <Text style={styles.englishText}>{englishWord}</Text>
                )}
              </CrossfadeImage>

            
          <View style={styles.wordContainer}>
            <Text style={styles.afrikaansText}>{afrikaansWord}</Text>
            {/* {showEnglish && (
              <Text style={styles.space}> : </Text> // Add a space character
            )}
            {showEnglish && (
              <Text style={styles.englishText}>{englishWord}</Text>
            )} */}
          </View>

          <TouchableOpacity
            style={styles.translateButton}
            onPress={handleTranslateClick}
          >
            <Text style={styles.translateButtonText}>
              {showEnglish ? "Hide English" : "Translate"}
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.arrowButtonPrev}
              onPress={handlePrevClick}
            >
              <Text style={styles.arrowTextPrev}>{"<---"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.arrowButtonNext}
              onPress={handleNextClick}
            >
              <Text style={styles.arrowTextNext}>{"--->"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  space: {
    fontSize: 20,
    fontWeight: "bold",
  },

  afrikaansText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  englishText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageStyle: {
    width: 250,

    height: 250,

    borderRadius: 6,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  translateButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  arrowButtonPrev: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
  },
  arrowButtonNext: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
  },
  arrowTextPrev: {
    fontSize: 18,
    fontWeight: "bold",
  },
  arrowTextNext: {
    fontSize: 18,
    fontWeight: "bold",
  },
  translateButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  selectedGradeText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  selectedCategoryText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});

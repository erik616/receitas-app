import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Image,
    Modal,
    Share
} from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native"

import { useLayoutEffect, useState } from "react";

import { Entypo, AntDesign, Feather } from "@expo/vector-icons"

import { Ingredients } from "../../components/ingredients";
import { Instructions } from "../../components/instructions";
import { VideoView } from "../../components/video";

import { isFavorite, saveFavorites, removeItem } from "../../utils/storage";

export function Detail() {
    const route = useRoute()
    const navigation = useNavigation()

    const [video, setVideo] = useState(false)
    const [favorite, setFavorite] = useState(false)

    useLayoutEffect(() => {

        async function getStatusFavorite() {
            const receipeFavorite = await isFavorite(route.params?.data)
            setFavorite(receipeFavorite)
        }
        getStatusFavorite()

        navigation.setOptions({
            title: route.params?.data ? route.params?.data.name : "Detalhes da receita",
            headerRight: () => (
                <Pressable
                    onPress={() => handleFavoriteReceipe(route.params?.data)}
                >
                    {favorite ? (
                        <Entypo
                            name="heart"
                            size={28}
                            color="#ff4141"
                        />
                    ) : (
                        <Entypo
                            name="heart-outlined"
                            size={28}
                            color="#ff4141"
                        />
                    )}
                </Pressable>
            )
        })
    }, [navigation, route.params?.data, favorite])


    async function handleFavoriteReceipe(receipe) {
        if(favorite){
            await removeItem(receipe.id)
            setFavorite(false)
        }else{
            saveFavorites("@appreceitas", receipe)
            setFavorite(true)
        }
    }

    function handleOpenVideo() {
        setVideo(true)
    }

    async function shareReceipe() {
        try {
            await Share.share({
                url: route.params?.data.video,
                message: `Receita: ${route.params?.data.name} | Ingredientes ${route.params?.data.total_ingredients}\nVi lá no app receita fácil\n${route.params?.data.video}`
            })
        } catch {

        }
    }

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 14 }} style={styles.container} showsVerticalScrollIndicator={false}>
            <Pressable onPress={handleOpenVideo}>
                <View style={styles.play}>
                    <AntDesign name="playcircleo" size={48} color="#FAFAFA" />
                </View>
                <Image
                    source={{ uri: route.params?.data.cover }}
                    style={styles.cover}
                />
            </Pressable>

            <View style={styles.details}>
                <View>
                    <Text style={styles.title}>{route.params?.data.name}</Text>
                    <Text style={styles.ingredientTetx}>Ingredientes ({route.params?.data.total_ingredients})</Text>
                </View>

                <Pressable onPress={shareReceipe}>
                    <Feather name="share-2" size={24} color="#121212" />
                </Pressable>
            </View>

            {route.params?.data.ingredients.map((item) => (
                <Ingredients
                    key={item.id}
                    data={item}
                />
            ))}

            <View style={styles.instructiosArea}>
                <Text style={styles.instructiosText}>Modo de Preparo</Text>
                <Feather
                    name="arrow-down"
                    size={24}
                    color="#fff"
                />
            </View>

            {route.params?.data.instructions.map((item, index) => (
                <Instructions
                    key={item.id}
                    data={item}
                    index={index}
                />
            ))}

            <Modal visible={video} animationType="slide">
                <VideoView
                    handleClose={() => setVideo(false)}
                    videoUrl={route.params?.data.video}
                />
            </Modal>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f9ff",
        paddingTop: 14,
        paddingBottom: 14,
        paddingStart: 14,
        paddingEnd: 14
    },
    cover: {
        height: 200,
        borderRadius: 14,
        width: '100%'
    },
    play: {
        position: "absolute",
        zIndex: 9,
        top: 0, right: 0, bottom: 0, left: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14
    },
    title: {
        fontSize: 18,
        marginTop: 14,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 4
    },
    ingredientTetx: {
        fontSize: 16,
        marginBottom: 14
    },
    instructiosArea: {
        backgroundColor: "#4cbe6c",
        flexDirection: "row",
        padding: 8,
        borderRadius: 4,
        marginBottom: 14
    },
    instructiosText: {
        fontSize: 18,
        fontWeight: 500,
        color: "#fff",
        marginRight: 8
    }
})
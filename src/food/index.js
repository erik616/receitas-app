import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from "@react-navigation/native";

export function FoodList({ data }) {
const navigation = useNavigation()

    function handleNavigate() {
        navigation.navigate("Detail", {data: data})
    }

    return (
        <TouchableOpacity
            onPress={handleNavigate}
            activeOpacity={.8}
            style={styles.container}>
            <Image
                source={{ uri: data.cover }}
                style={styles.cover}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.desc}>{data.total_ingredients} ingredientes | {data.time} min</Text>
            </View>
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.70)', 'rgba(0,0,0,0.95)']}
                style={styles.gradient}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 14,
    },
    cover: {
        width: "100%",
        height: 200,
        borderRadius: 14

    },
    info: {
        position: "absolute",
        left: 14,
        bottom: 14,
        zIndex: 99,
    },
    name: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold"
    },
    desc: {
        color: "#fff",
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "55%",
        borderRadius: 14,
        zIndex: 1,
        backgroundColor: "transparent"
    }
})
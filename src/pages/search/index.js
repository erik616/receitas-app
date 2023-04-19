import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";

import { FoodList } from "../../food";
import { FlatList } from "react-native";

import { api } from "../../services/api";

export function Search() {
    const [receips, setReceips] = useState([])

    const route = useRoute();

    useEffect(() => {
        async function fetchReceips() {
            const response = await api.get(`/foods?name_like=${route.params?.name}`)
            console.log(response);
            setReceips(response.data)
        }
        fetchReceips()

    }, [route.params?.name])

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={receips}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <FoodList data={item} key={item.id} />}
                ListEmptyComponent={() => <Text style={styles.text}>Não encontramos o item {route.params?.name}</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f9ff",
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 14
    },
    text: {
        fontSize: 18, fontWeight: 500
    }
})
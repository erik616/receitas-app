import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";

import { useIsFocused } from "@react-navigation/native";

import { useState, useEffect } from "react";

import { getFavorites } from "../../utils/storage";
import { FoodList } from "../../food";

export function Favorites() {
    const [receipes, setReceipes] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        /*
            useIsFocused usando para atualizar a parte de favoritos
            sempre que acessado
        **/
        let isActive = true

        async function getReceipes() {
            const result = await getFavorites("@appreceitas")
            if (isActive) setReceipes(result)
        }

        if (isActive) {
            getReceipes()
        }

        return () => {
            isActive = false
        }

    }, [isFocused])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Receitas Favoritas</Text>

            {receipes.length === 0 && (
                <Text
                    style={{ marginTop: 18, fontSize: 18, fontWeight: 500 }}
                >
                    Você ainda não tem nenhuma rceita salva.
                </Text>
            )}

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 14 }}
                data={receipes}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <FoodList data={item} key={item.id}/>}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f9ff',
        paddingTop: 36,
        paddingStart: 14,
        paddingEnd: 14
    },
    title: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 24,
    }
})
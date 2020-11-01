import React, { useEffect, useState } from 'react'
import { Modal, Image, TextInput, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, TouchableHighlight, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import ActivityIndicator from '../components/ActivtyIndectors/ActivityIndecatorOrderDetails'
import ListItemOrderDetail from '../components/ListItemOrderDetail'
import StatusBottm from '../components/StatusBottom'
import TrackingBox from '../components/TrackingBox'
import getOrder from '../api/getOrder'
import useAuth from "../auth/useAuth";
import colors from '../config/colors'
import Routes from '../Routes';




const OrderDetails = () => {
    const route = useRoute();
    let { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const navigation = useNavigation();
    const prefix = "DelayedOrders";
    const [amount, onChangeAmount] = React.useState('0');

    const [modalVisible, setModalVisible] = useState({
        arrive: false,
        return: false,
        partReturn: false,
        exchange: false,
        postpone: false
    });


    const loadDetails = async (token, id, notificatin_id = "0") => {
        const results = (await getOrder.getOrder(token, id, notificatin_id));
        setOrder(results.data.data[0]);
        setIsLoading(false);
    };
    useEffect(() => {
        loadDetails(user.token, route.params.id, route.params.notify_id);
        // loadDetails("5f637eb2b080f5f637eb2b08115f637eb2b08135f637eb2b0814", "198932");
    }, [])
    const handelColor = (id) => {
        switch (id) {
            case "4":
                return colors.success;
            case "5":
                return colors.secondery;
            case "6":
                return colors.primery;
            case "7":
                return colors.pause;
            case "8":
                return colors.returned;
            case "9":
                return colors.returned;
            case "13":
                return colors.gray;
            default:
                return colors.medium;
        }
    };
    const startChating = (id) => {
        navigation.navigate(Routes.CHAT_MODEL, { id: id })
    }
    return (
        <ScrollView

        >
            <View style={{ flex: 1, marginBottom: 10, paddingBottom: 5 }}>
                {order ?
                    <View style={{ flex: 1, marginBottom: 10, paddingBottom: 5 }}>
                        <View style={styles.orderDetailsContainer}>
                            <View style={{ width: "100%", height: "25%" }} >
                                <View style={styles.headerDetails}>
                                    <View style={[styles.titleOrderStatusView, { backgroundColor: handelColor(order.order_status_id) }]}>
                                        <Text style={styles.titleOrderStatus}>{order.order_status}</Text>
                                    </View>
                                    <Text style={styles.titleOrderId}>{order.order_no}</Text>
                                    <Text style={styles.titleStore}>{order.store_name}</Text>
                                </View>
                            </View>
                            <View style={styles.textContainer} >
                                <ListItemOrderDetail caption="أسم الزبون" details={order.customer_name} />
                                <ListItemOrderDetail onPress={true} caption="هاتف الزبون" details={order.customer_phone} />
                                {order.address ? <ListItemOrderDetail caption="عنوان الزبون" details={`${order.city} - ${order.town} - ${order.address}`} /> :
                                    <ListItemOrderDetail caption="عنوان الزبون" details={`${order.city} - ${order.town}`} />}
                                {order.dev_price && <ListItemOrderDetail caption="سعر التوصيل" details={order.dev_price} />}
                                {order.client_price && <ListItemOrderDetail caption="السعر الصافي" details={order.client_price} />}
                                {order.price && <ListItemOrderDetail caption="مبلغ الوصل" details={order.price} />}
                                {order.new_price && <ListItemOrderDetail caption="المبلغ المستلم" details={order.new_price} />}
                                {order.driver_name && <ListItemOrderDetail caption="أسم المندوب" details={order.driver_name} />}
                                {order.driver_phone && <ListItemOrderDetail onPress={true} caption="هاتف المندوب" details={order.driver_phone} />}
                                {order.driver_phone && <ListItemOrderDetail caption="تم التحاسب؟" details={order.money_status === "1" ? "نعم" : "كلا"} />}
                            </View>

                        </View>
                        {/* ----------------------- */}
                        <View
                            style={{
                                backgroundColor: colors.white,
                                width: "95%",
                                height: 200,
                                alignSelf: "center",
                                borderRadius: 1,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <StatusBottm color="success" title="واصل" onPress={() => setModalVisible({ ...modalVisible, arrive: true })} />
                                <StatusBottm color="returned" title="راجع كلي" onPress={() => setModalVisible({ ...modalVisible, return: true })} />
                                <StatusBottm color="returned" title="راجع جزئي" onPress={() => setModalVisible({ ...modalVisible, partReturn: true })} />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <StatusBottm color="secondery" title="استبدال" onPress={() => setModalVisible({ ...modalVisible, exchange: true })} />
                                <StatusBottm color="pause" title="مؤجل" onPress={() => setModalVisible({ ...modalVisible, postpone: true })} />
                            </View>
                        </View>
                        {/* ----------------------- */}

                        <TouchableWithoutFeedback onPress={() => startChating(order.id)}>
                            <View style={styles.chatShadow}
                            >
                                <Image style={styles.chatIcon} source={require("./../assets/icons/chatIcon.png")} />
                            </View>
                        </TouchableWithoutFeedback>
                        <ScrollView >
                            {order.tracking.map((item) =>
                                <TrackingBox key={`${prefix}_item.order_no`} bgColor={handelColor(item.order_status_id)} item={item} />)}


                            {/* -----arrive-------- */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible.arrive}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                }}
                            >
                                <View style={styles.centeredView} onPress={() => console.log("model pressed cencel")}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>تأكيد التوصيل:</Text>
                                        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }} >
                                            <TextInput
                                                style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, width: 100, marginBottom: 10, backgroundColor: colors.lightGreen, textAlign: "right" }}
                                                onChangeText={text => onChangeAmount(text)}
                                                value={amount}
                                            />
                                            <Text style={{ textAlign: "right", marginLeft: 8 }}>مبلغ الوصل:</Text>
                                        </View>
                                        <View style={{ flexDirection: "row-reverse", justifyContent: "space-around", alignItems: "center" }}>
                                            <TouchableHighlight
                                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                                onPress={() => {
                                                    setModalVisible({ ...modalVisible, arrive: !modalVisible.arrive });
                                                }}
                                            >
                                                <Text style={styles.textStyle}>تأكيد</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight
                                                style={{ ...styles.openButton, backgroundColor: colors.light }}
                                                onPress={() => {
                                                    setModalVisible({ ...modalVisible, arrive: !modalVisible.arrive });
                                                }}
                                            >
                                                <Text style={{ color: colors.black, alignSelf: "center" }}>ألغاء</Text>
                                            </TouchableHighlight>

                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            {/* -------- */}
                            {/* -----return-------- */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible.return}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Hello World!</Text>

                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                            onPress={() => {
                                                setModalVisible({ ...modalVisible, return: false });
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Hide Modal</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>
                            {/* -------- */}

                            {/* -----partreturn-------- */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible.partReturn}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Hello World!</Text>

                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                            onPress={() => {
                                                setModalVisible({ ...modalVisible, partReturn: false });
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Hide Modal</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>
                            {/* -------- */}
                            {/* -----exchange-------- */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible.exchange}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Hello World!</Text>

                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                            onPress={() => {
                                                setModalVisible({ ...modalVisible, exchange: false });
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Hide Modal</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>
                            {/* -------- */}
                            {/* -----postpone-------- */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible.postpone}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Hello World!</Text>

                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                            onPress={() => {
                                                setModalVisible({ ...modalVisible, postpone: false });
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Hide Modal</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>
                            {/* -------- */}


                        </ScrollView>
                    </View>
                    :
                    <ActivityIndicator visable={isLoading} />
                }
            </View >
        </ScrollView >
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: colors.black,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 10,
        elevation: 2,
        width: 70,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    headerDetails: {
        width: "90%",
        height: "100%",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderBottomColor: colors.primery,
        borderBottomWidth: 1,
        marginBottom: 5
    },
    container: {
        backgroundColor: colors.black,
        width: "100%",
        height: "100%"
    },
    orderDetailsContainer: {
        backgroundColor: colors.white,
        width: "100%",
        height: 300,
        marginBottom: 10,
        paddingBottom: 5,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // marginBottom: 10
    },
    textContainer: {
        width: "100%",
        height: "60%",
        // backgroundColor: "gray",
        marginRight: "10%",
        marginBottom: "5%",
        // marginTop: "2%",
        flexDirection: "column",
    },

    chatShadow: {
        width: 70,
        height: 70,
        position: "absolute",
        top: 150,
        left: 30,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        padding: 10,
        margin: 5,
    },
    chatIcon: {
        width: "90%",
        height: "90%",
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.medium,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    titleStore: {
        fontSize: 22,
        paddingTop: 5
    },
    titleOrderId: {
        fontSize: 22
    },
    titleOrderStatus: {
        color: "white",
        fontWeight: "bold"
    },
    titleOrderStatusView: {
        backgroundColor: colors.primery,
        padding: 15,
        borderRadius: 40,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    contanerBox: {
        height: "100%",
        width: "100%",
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        margin: 5,
    },
    trackingTitle: {
        color: "#39C555",
        fontWeight: "bold",
        fontSize: 14,
        paddingBottom: 10,
    },
    trackingNote: {
        color: colors.medium,
        fontSize: 12
    },

})

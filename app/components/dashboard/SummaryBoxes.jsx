import React from 'react';
import { StyleSheet, View } from 'react-native';

import ActivityIndecator from '../ActivtyIndectors/ActivityIndecatorSquers';
import SummaryBox from './SummaryBox';
import AppText from '../AppText';

const SummaryBoxes = ({ oneDay, isLoading }) => {

    return (
        <>

            <AppText style={styles.text}>خلاصة الطلبيات والمبالغ</AppText>
            {isLoading && <ActivityIndecator style={styles.summaryContainer} visable={isLoading} />}
            <View style={styles.summaryContainer}>
                {oneDay && <SummaryBox isLoading={isLoading} background="#4CAF50" boxes={oneDay.today} amount="اليوم" />}
                {oneDay && <SummaryBox background="#0B4EBC" boxes={oneDay.waiting} amount={"قيد الانتظار"} colorM="#fff"></SummaryBox>}
                {oneDay && <SummaryBox background="#F4B400" boxes={oneDay.postponded} amount="معلق" ></SummaryBox>}

            </View>
        </>
    )
}
export default SummaryBoxes;
const styles = StyleSheet.create({
    summaryContainer: {
        flexDirection: 'row-reverse',
        justifyContent: "space-around",
        padding: 5
    },
    text: {
        paddingTop: 25,
        textAlign: 'center'
    }

})

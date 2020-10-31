import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ActivityIndecator from '../components/ActivtyIndectors/ActivityIndecatorAds';
import SummaryBoxes from '../components/dashboard/SummaryBoxes'
import AdsCompany from './../components/dashboard/AdsCompany'
import OptionsList from '../components/dashboard/OptionsList'
import loadings from '../config/loadings';
import Screen from '../components/Screen';
import getAdsAPI from '../api/getAds';
import useAuth from "../auth/useAuth";

const Dashboard = () => {
    const [adsText, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let { user } = useAuth();

    const adsView = async () => {
        setIsLoading(true);
        const results = (await getAdsAPI.get(user.token));
        setText(results.data.config);
        setIsLoading(false);
    };
    useEffect(() => {
        adsView();
    }, []);

    return (
        <Screen>
            <ScrollView>
                {!adsText.c_ad1 ? <ActivityIndecator visable={isLoading} type={loadings.adsTab} /> :
                    adsText.d_ad1 && <AdsCompany title={adsText.d_ad1} />}
                <SummaryBoxes />
                <OptionsList />
            </ScrollView>
        </Screen>
    )
}
export default Dashboard;
const styles = StyleSheet.create({
})

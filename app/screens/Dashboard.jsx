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
import getStatistic from '../api/getSummayBoxed'

const Dashboard = () => {
    const [adsText, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [oneDay, setOneDay] = useState(null);
    const [data, setData] = useState(null);
    let { user } = useAuth();

    const loadStatic = async () => {
        setIsLoading(true);
        const results = (await getStatistic.get(user.token));
        setOneDay(results.data.data[0]);
        setData(results.data.static[0]);
        setIsLoading(false);
    };

    const adsView = async () => {
        setIsLoading(true);
        const results = (await getAdsAPI.get(user.token));
        setText(results.data.config);
        setIsLoading(false);
    };
    useEffect(() => {
        loadStatic();
        adsView();
    }, []);

    return (
        <Screen>
            <ScrollView>
                {!adsText.c_ad1 ? <ActivityIndecator visable={isLoading} type={loadings.adsTab} /> :
                    adsText.d_ad1 && <AdsCompany title={adsText.d_ad1} />}
                <SummaryBoxes oneDay={oneDay} isLoading={isLoading} />
                <OptionsList data={data} />
            </ScrollView>
        </Screen>
    )
}
export default Dashboard;
const styles = StyleSheet.create({
})

import { View, Text } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';
import { useLayoutEffect } from 'react';
import {HeaderBackButton} from "@react-navigation/elements";
import DeliveryCard from '../components/DeliveryCard';
export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type OrderScreenRouteProp = RouteProp<RootStackParamList, 'Order'>;
const OrderScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
        headerTitle: order.trackingItems.customer.name,
        headerTintColor: "#EB7A7C",
        headerTitleStyle: {color: "black"},
        headerBackTitle: "Deliveries",
        headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              labelVisible={true}
              onPress={() => navigation.goBack()}
            />
          ),

    })
  }, [order]);
  return (
    <View style={tw('-mt-2')}>
        <DeliveryCard order={order} fullWidth/>
    </View>
  );
};

export default OrderScreen;

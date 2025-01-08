import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Header} from '../../comman/CommanHeader';
import Geocoder from 'react-native-geocoding';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  Circle,
} from 'react-native-maps';
const LATITUDE_DELTA = 0.10087654165398163;
const LONGITUDE_DELTA = 0.10284561663866043;
const LATITUDE = 22.62938671242907;
const LONGITUDE = 88.4354486029795;

const UserLocation = ({navigation, route}) => {
  Geocoder.init('AIzaSyBpqBp_UAv-0H0GvHMfBG0hvl1L-VJ69g0');
  let marker = React.useRef(null);
  let mapRef = React.useRef(null);
  const [latitude, setLatitude] = useState(LATITUDE);
  const [longitude, setLongitude] = useState(LONGITUDE);

  const [isloading, setLoading] = useState(false);

  const handleResponse = data => {
    console.log(data);
    setLoading(data.loading);
  };

  useEffect(() => {
    Geocoder.from(route.params.location)
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log(location);
        setLatitude(location.lat);
        setLongitude(location.lng);
      })
      .catch(error => console.warn(error));
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header
          pressBackButton={() => navigation.goBack()}
          screenName={'Street'}
        />

        <View style={{flex: 1}}>
          <MapView
            style={{flex: 1}}
            ref={mapRef}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}></Marker>
          </MapView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserLocation;

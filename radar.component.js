import React, {
    Component
} from 'react';

import {
    Image,
    Text,
    View,
    TouchableHighlight,
    Linking
} from 'react-native';

import Svg, {
    Circle, Rect, G
} from 'react-native-svg';

import { GeoUtil } from './geoutility'

export class Radar extends Component {

    constructor(props) {
        super(props);

        this.elements =
            <View>
                <Svg
                    height={this.props.size}
                    width={this.props.size}
                    >
                    <View
                        style={{
                            position: "absolute"
                        }}
                        left={this.props.size - 45}
                        >
                        <Text

                            >
                            ^
                    </Text>
                        <Text
                            >
                            N
                    </Text>
                    </View>
                    <Circle
                        cx={this.props.size / 2}
                        cy={this.props.size / 2}
                        r={this.props.size / 2 - 3}
                        fill="green"
                        fillOpacity="0.38"
                        stroke="green"
                        strokeOpacity="0.62"
                        />

                    <Circle
                        cx={this.props.size / 2}
                        cy={this.props.size / 2}
                        r="3"
                        fill="green"
                        fillOpacity="0.62"
                        />

                </Svg>
                {
                    this.getMemberElements()
                }
            </View>
            ;
    }

    render() {
        return (
            this.elements
        );
    }

    getMemberElements() {
        return this.props.list.map(
            function (other) {

                let otherOnRadar = this.getCoordinateOnRadar(this.props.mine, other);

                return (
                    <View
                        style={{
                            position: "absolute"
                        }}
                        key={other.name}
                        left={otherOnRadar.x - 4}
                        top={otherOnRadar.y - 4}
                        >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                            >
                            <Image
                                source={require('./images/person.png')}
                                style={{
                                    resizeMode: "contain",
                                    width: 8,
                                    height: 8
                                }}
                                />
                            <Text
                                style={{
                                    fontSize: 8,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}
                                >
                                {other.name}
                            </Text>
                        </View>

                        <TouchableHighlight
                            onPress={() => this.openLink("geo:0,0?q=" + other.lat + "," + other.long + "(" + other.name + ")")}
                            >
                            <Text
                                style={{
                                    fontSize: 8,
                                    textAlign: "center",
                                }}
                                >
                                {otherOnRadar.distance.toFixed(2)}km
                        </Text>
                        </TouchableHighlight>
                    </View>
                );
            }, this)
    }

    getCoordinateOnRadar(mine, other) {
        let radarRange = 5; // 5km
        let ratio = (this.props.size / 2) / radarRange; // Radar size versus radarRange

        let realDistance = GeoUtil.getDistance(mine.lat, mine.long, other.lat, other.long);
        let distance = (realDistance > radarRange ? (radarRange) : realDistance) * ratio;

        let bearing = GeoUtil.getBearingRadians(mine.lat, mine.long, other.lat, other.long);

        return {
            distance: realDistance,
            x: ((this.props.size / 2) - (distance * Math.cos(bearing))),
            y: ((this.props.size / 2) - (distance * Math.sin(bearing)))
        }
    }

    openLink(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
}
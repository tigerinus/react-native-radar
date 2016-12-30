import React, {
    Component
} from 'react';

import Svg, {
    Circle, Text, Rect, G
} from 'react-native-svg';

import { GeoUtil } from './geoutility'

export class Radar extends Component {

    constructor(props) {
        super(props);

        this.elements =
            <Svg
                id="base"
                height={this.props.size}
                width={this.props.size}
                >
                <Text
                    x={this.props.size - 45}
                    fontSize="20"
                    textAnchor="middle"
                    fill="red"
                    fontWeight="bold"
                    >
                    ^
                    </Text>
                <Text
                    x={this.props.size - 45}
                    y="10"
                    fontSize="20"
                    textAnchor="middle"
                    fontWeight="bold"
                    >
                    N
                    </Text>
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

                {
                    this.getMemberElements()
                }
            </Svg>;
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
                    <G key={other.name}>
                        <Rect
                            x={otherOnRadar.x - 2}
                            y={otherOnRadar.y - 2}
                            width="4"
                            height="4"
                            stroke="red"
                            strokeWidth="1"
                            fill="yellow"
                            />
                        <Text
                            x={otherOnRadar.x}
                            y={otherOnRadar.y + 3}
                            textAnchor="middle"
                            fontSize="8"
                            >
                            {other.name}:{otherOnRadar.distance.toFixed(2)}km
                        </Text>
                    </G>
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
}
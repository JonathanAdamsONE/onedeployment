import circleSvg from       "../../assets/images/circle.svg";
import OccupancyCircle from "../../assets/images/sensors/occupancySensor.svg";
import HybridCircle from    "../../assets/images/sensors/hybridSensor.svg";
import EnergyCircle from    "../../assets/images/sensors/energySensor.svg";

import circleHighlightedSvg from "../../assets/images/circle_highlighted.svg";
import temperatureSvg from "../../assets/images/temperature_property.svg";
import humiditySvg from "../../assets/images/humidity_property.svg";
import co2Svg from "../../assets/images/co2_property.svg";
import OccuSvg from "../../assets/images/occupancy.svg";
import groupOccuSvg from "../../assets/images/occupancy2.svg";

export const SpriteSize = 24;

/**
 * @type {SensorStyleDefinitions}
 */
export const SensorStyleDefinitions = {
    "Test-Sensor-ID-Occupancy-Sensor": {
        url: OccupancyCircle,
        highlightedUrl: circleHighlightedSvg,
        color: 0xffffff,
        highlightedColor: 0xffffff,
    },
    "d370a293-4bd5-4bdb-a3df-376dc131d44c": {
        url: HybridCircle,
        highlightedUrl: circleHighlightedSvg,
        color: 0xffffff,
        highlightedColor: 0xffffff,
    },
    "Energy-Usage-Sensor": {
        url: EnergyCircle,
        highlightedUrl: circleHighlightedSvg,
        color: 0xffffff,
        highlightedColor: 0xffffff,
    },
    default: {
        url: circleSvg,
        highlightedUrl: circleHighlightedSvg,
        color: 0xffffff,
        highlightedColor: 0xffffff,
        //You may use this instead of highlightedUrl and highlightedColor to simply color over the regular url image
        // highlightedColor: 0xa1c5ff,
    },
};

/**
 * A map that maps a property ID with its corresponding color stop values.
 * This mapping is used for both heatmap rendering, as well as for heatmap
 * slider background color. See registerSurfaceShadingColors API for usage
 * details.
 */
export const PropIdGradientMap = {
    Occupied: [0x00ff00, 0xff0000],
    "Occupancy Percentage": [0xFF8844, 0x88FF44],
    Temperature: [0x0000ff, 0x00ff00, 0xffff00, 0xff0000],
    Humidity: [0x00f260, 0x0575e6],
    "CO₂": [0x1e9600, 0xfff200, 0xff0000],
};

export const PropertyIconMap = {
    Occupied: OccuSvg,
    "Occupancy Percentage": groupOccuSvg,
    Temperature: temperatureSvg,
    Humidity: humiditySvg,
    "CO₂": co2Svg,
};

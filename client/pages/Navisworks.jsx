import React, { useEffect, useRef, useState } from "react";
import { BaseApp } from "forge-dataviz-iot-react-components";
import DataHelper from "./DataHelper";
import { EventTypes } from "forge-dataviz-iot-react-components";

import fan00 from "../../assets/images/fan-00.svg";
import fan01 from "../../assets/images/fan-01.svg";
import fan02 from "../../assets/images/fan-02.svg";
import fan03 from "../../assets/images/fan-03.svg";
import fan04 from "../../assets/images/fan-04.svg";
import fan05 from "../../assets/images/fan-04.svg";

import { SpriteSize, SensorStyleDefinitions, PropIdGradientMap, PropertyIconMap } from "../config/SensorStyles.js";

const fans = [fan00, fan01, fan02, fan03, fan04, fan05];

const RAW_DATA = [
    {
        id: "TunnelA",
        dbIds: [2707],
        sensors: [
            {
                id: "sensor-1",
                dbId: 2707,
                type: "fan",
                sensorTypes: ["Temperature"],
            },
            {
                id: "sensor-2",
                dbId: 4129,
                type: "fan",
                sensorTypes: ["Temperature"],
            },
        ],
    },
];

class EventBus {}

THREE.EventDispatcher.prototype.apply(EventBus.prototype);

const surfaceShadingConfig = {
    spriteSize: SpriteSize,
    deviceStyles: Object.assign({}, SensorStyleDefinitions, {
        fan: {
            url: fan00,
            highlightedUrl: fan00,
            color: 0xffffff,
            highlightedColor: 0x44ff00,
            animatedUrls: fans
        },
    }),
    gradientSetting: PropIdGradientMap
};

function Navisworks(props) {
    const eventBusRef = useRef(new EventBus());
    const [data, setData] = useState(null);

    const dataRef = useRef();
    const viewerRef = useRef(null);

    props.appData.docUrn =
        "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aHlwZXJpb24tZGVtby1idWNrZXQvTWVsYm91cm5lJTIwVHVubmVsJTIwVHJpbW1lZC5ud2Q";
    props.appData.adapterType = "synthetic";

    useEffect(() => {
        eventBusRef.current.addEventListener(EventTypes.MODEL_LOAD_COMPLETED, async function (event) {
            viewerRef.current = event.data.viewer;
            let viewer = viewerRef.current;

            let model = event.data.data.model;
            let dataHelper = new DataHelper();

            let shadingData = await dataHelper.createShadingData(viewer, model, RAW_DATA);
            let devicePanelData = dataHelper.createDeviceTree(shadingData, true);

            dataRef.current = {
                shadingData,
                devicePanelData,
            };
            setData(dataRef.current);

            return function cleanUp() {
                eventBusRef.current._listeners = {};
            };
        });
    }, []);

    eventBusRef.current.addEventListener("VIEWER_DATA_READY", (event) => {
        let {dataVizExtn} =  event.data;

        let i = 0;

        let ids = dataVizExtn.viewableData.viewables.map((viewable) => viewable.dbId);
        
        setInterval(() => {
            dataVizExtn.invalidateViewables(ids, (viewable) => {
                return {url : fans[i++ % 5]}
            })
        }, 200);
    });

    return (
        <React.Fragment>
            <BaseApp 
            {...props} 
            eventBus={eventBusRef.current} 
            surfaceShadingConfig={surfaceShadingConfig}
            data={data} />
        </React.Fragment>
    );
}

module.exports = Navisworks;
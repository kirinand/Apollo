'use client'

import { ResponsiveRadar } from '@nivo/radar'

import { SentimentType } from '@/types'
import constants from '@/constants'

// import dynamic from "next/dynamic"
// const ResponsiveRadar = dynamic(() => import("@nivo/radar").then(m => m.ResponsiveRadar), { ssr: false })

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const RadarChart = ({ data }: { data: Array<SentimentType> }) => (
    <ResponsiveRadar
        data={data}
        keys={[ 'count' ]}
        indexBy="name"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'nivo' }}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

export default RadarChart
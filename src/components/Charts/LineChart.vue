<template>
    <div id="main" class="chart" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    import resize from './mixins/resize'
    export default {
        mixins: [resize],
        props: {
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '400px'
            },
            chartData: {
                type: Array,
                required: true
            },
            xAxisData: {
                type: Array,
                required: true
            },
            chartTitle: {
                type: String,
                default: ''
            },
            seriesName: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                chart: null,
            }
        },
        watch: {
            chartData: {
                deep: true,
                handler(val) {
                    this.setOptions(val)
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el, 'light')
                this.setOptions(this.chartData)
            },
            setOptions(chartData) {
                if (this.chart) {
                    this.chart.setOption({
                        title: {
                            text: this.chartTitle,
                            left: 'center',
                            top: 30,
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                magicType: {
                                    type: ['line', 'bar']
                                },
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: this.xAxisData,
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} 个'
                            }
                        },
                        color: '#3aa1ff',
                        series: [{
                            name: this.seriesName,
                            type: 'line',
                            smooth: true,
                            data: chartData,
                            markPoint: {
                                data: [{
                                        type: 'max',
                                        name: '最大值'
                                    },
                                    {
                                        type: 'min',
                                        name: '最小值'
                                    }
                                ]
                            },
                            markLine: {
                                data: [{
                                    type: 'average',
                                    name: '平均值'
                                }]
                            }
                        }]
                    })
                }
            },
        }
    }
</script>
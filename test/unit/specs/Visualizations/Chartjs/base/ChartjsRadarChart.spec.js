import Component from '@/components/visualizations/Chartjs/base/ChartjsRadarChart'
import { shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue'
import ChartjsHelper from '@/common/chartjsHelper.js'


const data = [
  {
    "Radar1": [
      {
        "value": 15,
        "label": "Scatter Plot"
      },
      {
        "value": 30,
        "label": "Pie"
      },
      {
        "value": 20,
        "label": "Area"
      }
    ]
  },
  {
    "Radar2": [
      {
        "value": 20,
        "label": "Scatter Plot"
      },
      {
        "value": 20,
        "label": "Pie"
      },
      {
        "value": 9,
        "label": "Area"
      }
    ]
  }
]
const props = new ChartjsHelper().radarChartParser(data, ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"]);


describe('Chartjs Radar Chart', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(Component, {
          propsData: {
              chartData: props
         },
         attachToDocument: true
      })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('it renders at all', () => {
        expect(wrapper.contains('canvas')).toBe(true)
        expect(wrapper.html()).toContain('<canvas')
    })

    it('has the right prop data', () => {
      expect(wrapper.props()).toHaveProperty('chartData.labels')
      expect(wrapper.props()).toHaveProperty('chartData.datasets')
      expect(wrapper.props().chartData.labels).toHaveLength(3)
      expect(wrapper.props().chartData.labels).toContain('Area')
    })
})

describe('Chartjs Radar chart, snapshot', ()=>{
    let wrapper

    beforeEach(() => {
        wrapper = mount(Component, {
            propsData: {
                chartData: props
           },
           attachToDocument: true
        })
    })

    it('matches snapshot', () => {
        let renderer = createRenderer()
        return Vue.nextTick()
            .then(function(){
                renderer.renderToString(wrapper.vm, (err, str) => {
                  if (err) throw new Error(err)
                  expect(str).toMatchSnapshot()
                })
            })

    })

})

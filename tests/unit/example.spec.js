import { shallowMount } from '@vue/test-utils'
import SystemBar from '@/components/SystemBar.vue'

describe('SystemBar.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(SystemBar, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

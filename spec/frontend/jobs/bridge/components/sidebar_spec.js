import { GlButton, GlDropdown } from '@gitlab/ui';
import { shallowMount } from '@vue/test-utils';
import BridgeSidebar from '~/jobs/bridge/components/sidebar.vue';
import CommitBlock from '~/jobs/components/commit_block.vue';
import { mockCommit, mockJob } from '../mock_data';

describe('Bridge Sidebar', () => {
  let wrapper;

  const createComponent = (props) => {
    wrapper = shallowMount(BridgeSidebar, {
      propsData: {
        bridgeJob: mockJob,
        commit: mockCommit,
        ...props,
      },
    });
  };

  const findJobTitle = () => wrapper.find('h4');
  const findCommitBlock = () => wrapper.findComponent(CommitBlock);
  const findRetryDropdown = () => wrapper.find(GlDropdown);
  const findToggleBtn = () => wrapper.findComponent(GlButton);

  afterEach(() => {
    wrapper.destroy();
  });

  describe('template', () => {
    beforeEach(() => {
      createComponent();
    });

    it('renders job name', () => {
      expect(findJobTitle().text()).toBe(mockJob.name);
    });

    it('renders retry dropdown', () => {
      expect(findRetryDropdown().exists()).toBe(true);
    });

    it('renders commit information', () => {
      expect(findCommitBlock().exists()).toBe(true);
    });
  });

  describe('sidebar expansion', () => {
    beforeEach(() => {
      createComponent();
    });

    it('emits toggle sidebar event on button click', async () => {
      expect(wrapper.emitted('toggleSidebar')).toBe(undefined);

      findToggleBtn().vm.$emit('click');

      expect(wrapper.emitted('toggleSidebar')).toHaveLength(1);
    });
  });
});

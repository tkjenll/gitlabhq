import { shallowMount } from '@vue/test-utils';
import TitleSuggestions from '~/issues/new/components/title_suggestions.vue';
import TitleSuggestionsItem from '~/issues/new/components/title_suggestions_item.vue';

describe('Issue title suggestions component', () => {
  let wrapper;

  function createComponent(search = 'search') {
    wrapper = shallowMount(TitleSuggestions, {
      propsData: {
        search,
        projectPath: 'project',
      },
    });
  }

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('does not render with empty search', () => {
    wrapper.setProps({ search: '' });

    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.isVisible()).toBe(false);
    });
  });

  describe('with data', () => {
    let data;

    beforeEach(() => {
      data = { issues: [{ id: 1 }, { id: 2 }] };
    });

    it('renders component', () => {
      // setData usage is discouraged. See https://gitlab.com/groups/gitlab-org/-/epics/7330 for details
      // eslint-disable-next-line no-restricted-syntax
      wrapper.setData(data);

      return wrapper.vm.$nextTick(() => {
        expect(wrapper.findAll('li').length).toBe(data.issues.length);
      });
    });

    it('does not render with empty search', () => {
      wrapper.setProps({ search: '' });
      // setData usage is discouraged. See https://gitlab.com/groups/gitlab-org/-/epics/7330 for details
      // eslint-disable-next-line no-restricted-syntax
      wrapper.setData(data);

      return wrapper.vm.$nextTick(() => {
        expect(wrapper.isVisible()).toBe(false);
      });
    });

    it('does not render when loading', () => {
      // setData usage is discouraged. See https://gitlab.com/groups/gitlab-org/-/epics/7330 for details
      // eslint-disable-next-line no-restricted-syntax
      wrapper.setData({
        ...data,
        loading: 1,
      });

      return wrapper.vm.$nextTick(() => {
        expect(wrapper.isVisible()).toBe(false);
      });
    });

    it('does not render with empty issues data', () => {
      // setData usage is discouraged. See https://gitlab.com/groups/gitlab-org/-/epics/7330 for details
      // eslint-disable-next-line no-restricted-syntax
      wrapper.setData({ issues: [] });

      return wrapper.vm.$nextTick(() => {
        expect(wrapper.isVisible()).toBe(false);
      });
    });

    it('renders list of issues', () => {
      // setData usage is discouraged. See https://gitlab.com/groups/gitlab-org/-/epics/7330 for details
      // eslint-disable-next-line no-restricted-syntax
      wrapper.setData(data);

      return wrapper.vm.$nextTick(() => {
        expect(wrapper.findAll(TitleSuggestionsItem).length).toBe(2);
      });
    });

    it('adds margin class to first item', () => {
      // setData usage is discouraged. See https://gitlab.com/groups/gitlab-org/-/epics/7330 for details
      // eslint-disable-next-line no-restricted-syntax
      wrapper.setData(data);

      return wrapper.vm.$nextTick(() => {
        expect(wrapper.findAll('li').at(0).classes()).toContain('gl-mb-3');
      });
    });

    it('does not add margin class to last item', () => {
      // setData usage is discouraged. See https://gitlab.com/groups/gitlab-org/-/epics/7330 for details
      // eslint-disable-next-line no-restricted-syntax
      wrapper.setData(data);

      return wrapper.vm.$nextTick(() => {
        expect(wrapper.findAll('li').at(1).classes()).not.toContain('gl-mb-3');
      });
    });
  });
});

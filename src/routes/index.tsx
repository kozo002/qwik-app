import type { DocumentHead } from "@builder.io/qwik-city";

import { component$, $, useStore, useContextProvider, createContextId, useContext, Slot } from "@builder.io/qwik";

export function createTab<T extends string[]>(tabKeys: T, initial?:  T[number]) {
  type TabStore = { activeKey: T[number] }
  const TabContext = createContextId<TabStore>('Tab_' + tabKeys.join('_'));

  const Tab = component$(() => {
    const store = useStore({ activeKey: initial ?? tabKeys[0] })
    useContextProvider(TabContext, store)

    const handleClick = (key: T[number]) => {
      return $(() => {
        store.activeKey = key
      })
    }

    return (
      <div>
        <div>
          {tabKeys.map((key) => <button type="button" key={key} onClick$={handleClick(key)}>{key}</button>)}
        </div>
        <div>
          <Slot />
        </div>
      </div>
    )
  })

  const TabContent = component$(({ tabKey }: { tabKey: T[number] }) => {
    const tab = useContext(TabContext)
    if (tab.activeKey !== tabKey) {
      return
    }
    return <Slot />
  })

  return { Tab, TabContent }
}

const { Tab, TabContent } = createTab(['tab1', 'tab2', 'tab3'] as const, 'tab2')
const { Tab: Tab2, TabContent: TabContent2 } = createTab(['a', 'b', 'c'] as const)

export default component$(() => {
  return (
    <div>
      <Tab>
        <TabContent tabKey="tab1">111111111111111111111</TabContent>
        <TabContent tabKey="tab2">222222222222222</TabContent>
        <TabContent tabKey="tab3">33333333333333333333333</TabContent>
      </Tab>
      <Tab2>
        <TabContent2 tabKey="a">aaaaaaaaa</TabContent2>
        <TabContent2 tabKey="b">bbbbbb</TabContent2>
        <TabContent2 tabKey="c">cccc</TabContent2>
      </Tab2>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

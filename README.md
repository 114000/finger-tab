## Some Guitar Tabs

1. create a file in `public` dir. e.g. `heart.html`
2. add record to `staff` object in `data/index.ts` e.g. `'2': { id: '2', name: 'Heart', author: 'Satoshi', url: '/heart.html'}` 


``` ts
const nodes: (SourceStave | SourceNote)[]

// nodes => layout
const layout: LayoutStave[]
const layoutStave: { ..., notes: LayoutNote[] }

```
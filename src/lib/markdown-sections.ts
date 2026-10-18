// Markdown plugin (Sätteri, Astro's Markdown processor) that shapes page
// bodies for the two-column layout:
//
// - Each `## Heading` and the content under it becomes
//   <section class="md-section"><h2/><div class="md-section__body">…</div></section>
// - A `<!-- key-decision -->` line is replaced by the key decision callout,
//   built from the `decision:` frontmatter. Without the marker, the callout
//   goes at the end of the body.
// - Tables are wrapped in a box that scrolls sideways on small screens.
import type { Element, ElementContent, Root, RootContent } from 'hast';
import { smartQuotes } from './typography';

type Child = ElementContent;

function el(tagName: string, properties: Element['properties'], children: Child[] = []): Element {
  return { type: 'element', tagName, properties, children };
}
const txt = (value: string): Child => ({ type: 'text', value: smartQuotes(value) });

// The hint only shows on narrow screens, where the table overflows its box.
function scrollBox(table: Element, label: string): Element {
  return el('div', { className: ['table-wrap'] }, [
    el('p', { className: ['table-hint'], ariaHidden: 'true' }, [txt('Swipe for more →')]),
    el('div', { className: ['table-scroll'], tabIndex: 0, role: 'region', ariaLabel: label }, [table]),
  ]);
}

interface Decision {
  eyebrow?: string;
  headline: string;
  body: string;
  table?: string[][];
  points?: string[];
  why?: string;
  tradeoff?: string;
}

function callout(d: Decision): Element {
  const children: Child[] = [
    el('p', { className: ['eyebrow', 'eyebrow--accent'] }, [txt(d.eyebrow ?? 'Key decision')]),
    el('h2', { className: ['decision__headline'], id: 'key-decision' }, [txt(d.headline)]),
    el('p', { className: ['decision__body'] }, [txt(d.body)]),
  ];

  if (d.table && d.table.length > 1) {
    const [head, ...rows] = d.table;
    const thead = el('thead', {}, [
      el('tr', {}, head.map((cell) => (cell.trim() ? el('th', { scope: 'col' }, [txt(cell)]) : el('td', {})))),
    ]);
    const tbody = el(
      'tbody',
      {},
      rows.map((row) =>
        el('tr', {}, row.map((cell, i) => (i === 0 ? el('th', { scope: 'row' }, [txt(cell)]) : el('td', {}, [txt(cell)])))),
      ),
    );
    children.push(scrollBox(el('table', { className: ['decision__table'] }, [thead, tbody]), `${d.headline}: comparison`));
  }

  if (d.points?.length) {
    children.push(el('ul', { className: ['decision__points'] }, d.points.map((p) => el('li', {}, [txt(p)]))));
  }

  const candidates: [string, string | undefined][] = [
    ['Why', d.why],
    ['Tradeoff', d.tradeoff],
  ];
  const pair = candidates.filter((entry): entry is [string, string] => Boolean(entry[1]));
  if (pair.length) {
    children.push(
      el(
        'dl',
        { className: ['decision__pair'] },
        pair.map(([term, desc]) =>
          el('div', {}, [el('dt', { className: ['eyebrow', 'eyebrow--accent'] }, [txt(term)]), el('dd', {}, [txt(desc)])]),
        ),
      ),
    );
  }

  return el('section', { className: ['decision'], ariaLabelledBy: ['key-decision'] }, children);
}

const isMarker = (node: RootContent) =>
  (node.type === 'raw' || node.type === 'comment') && /^\s*(<!--)?\s*key-decision\s*(-->)?\s*$/.test(node.value);

export const markdownSections = {
  name: 'markdown-sections',
  after(root: Readonly<Root>, ctx: { data: { astro?: { frontmatter?: Record<string, unknown> } }; replaceNode: (n: Root, r: Root) => void }) {
    const decision = ctx.data.astro?.frontmatter?.decision as Decision | undefined;
    const out: RootContent[] = [];
    let body: Element | null = null;
    let placed = false;

    for (const original of root.children) {
      let node = original;
      if (isMarker(node)) {
        body = null;
        if (decision && !placed) {
          out.push(callout(decision));
          placed = true;
        }
        continue;
      }
      if (node.type === 'element' && node.tagName === 'table') node = scrollBox(node, 'Table');
      if (node.type === 'element' && node.tagName === 'h2') {
        body = el('div', { className: ['md-section__body'] });
        out.push(el('section', { className: ['md-section'] }, [node, body]));
        continue;
      }
      if (body) body.children.push(node as Child);
      else out.push(node);
    }

    if (decision && !placed) out.push(callout(decision));
    ctx.replaceNode(root as Root, { type: 'root', children: out });
  },
};

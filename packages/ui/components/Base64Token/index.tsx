import { useEffect, useRef, useState } from 'react';
import { ATokenIcon } from '../TokenIcon';

/**
 * To save some bundle size we stopped base64 encoding & inlining svgs as base encoding increases size by up to 30%
 * and most users will never need all token icons.
 * The aToken icons have previously been separate icons also adding to bundle size. Now they are composed on the fly.
 * When adding a token to metamask, you can either supply a url or a base64 encoded string.
 * Supplying a url seems not very rational, but supplying a base64 for an external svg image that is composed with a react component is non trivial.
 * Therefore the solution we came up with is:
 * 1. rendering the svg component as an object
 * 2. rendering the aToken ring as a react component
 * 3. using js to manipulate the dome to have the object without the subdocument inside the react component
 * 4. base64 encode the composed dom svg
 *
 * This component is probably hugely over engineered & unnecessary.
 * I'm looking forward for the pr which evicts it.
 */
export function Base64Token({
  symbol,
  onImageGenerated,
  aToken,
}: {
  symbol: string;
  aToken?: boolean;
  onImageGenerated: (base64: string) => void;
}) {
  const ref = useRef<HTMLObjectElement>(null);
  const aRef = useRef<SVGSVGElement>(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log({ a: !loading && ref.current?.contentDocument });

    if (!loading && ref.current?.contentDocument) {
      if (aToken) {
        // const inner = ref.current?.contentDocument?.childNodes?.[0] as any;
        const inner = ref.current.contentDocument.childNodes[0];

        console.log({ inner });

        // const oldWidth = inner.getAttribute('width');
        // const oldHeight = inner.getAttribute('height');
        // const vb = inner.getAttribute('viewBox');
        // inner.setAttribute('x', 25);
        // inner.setAttribute('width', 206);
        // inner.setAttribute('y', 25);
        // inner.setAttribute('height', 206);
        // if (!vb) {
        //   inner.setAttribute('viewBox', `0 0 ${oldWidth} ${oldHeight}`);
        // }

        // aRef.current?.appendChild(inner);
        // const s = new XMLSerializer().serializeToString(aRef.current as unknown as Node);

        // onImageGenerated(
        //   `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(s)))}`,
        // );
      } else {
        const s = new XMLSerializer().serializeToString(ref.current.contentDocument);
        onImageGenerated(
          `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(s)))}`,
        );
      }
    }
  }, [loading, aToken, onImageGenerated]);

  return (
    <div
      style={{
        visibility: 'hidden',
        height: 0,
        width: 0,
        overflow: 'hidden',
      }}
    >
      <object
        style={{ opacity: 1 }}
        ref={ref}
        id='svg'
        data={`/icons/tokens/${symbol.toLowerCase()}.svg`}
        onLoad={() => setLoading(false)}
      />
      {aToken && <ATokenIcon ref={aRef} />}
    </div>
  );
}

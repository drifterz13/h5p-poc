// @ts-expect-error "Cannot find module 'h5p-standalone'"
import { H5P } from "h5p-standalone";
import { useEffect, useRef } from "react";

function H5pPlayer({
  h5pJsonPath,
  contentJsonPath,
}: {
  h5pJsonPath: string;
  contentJsonPath?: string;
}) {
  const h5pContainer = useRef(null);

  useEffect(() => {
    const el = h5pContainer.current;
    const options = {
      h5pJsonPath,
      ...(contentJsonPath && { contentJsonPath }),
      frameJs: "/assets/frame.bundle.js",
      frameCss: "/assets/styles/h5p.css",
    };
    return () => {
      new H5P(el, options)
        .then((res: unknown) => {
          console.log(res);
        })
        .catch((e: unknown) => {
          console.log("Err: ", e);
        });
    };
  }, [h5pJsonPath, h5pContainer]);

  return (
    <>
      <div ref={h5pContainer}></div>
    </>
  );
}

export default H5pPlayer;

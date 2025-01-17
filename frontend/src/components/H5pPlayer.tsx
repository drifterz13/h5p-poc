import { H5P } from "h5p-standalone";
import { useEffect, useRef, useState } from "react";

function H5pPlayer({
  h5pJsonPath,
  contentJsonPath,
}: {
  h5pJsonPath: string;
  contentJsonPath?: string;
}) {
  const h5pContainer = useRef<HTMLDivElement | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) return;

    const h5pIframe = document.querySelector(".h5p-iframe") as HTMLIFrameElement;
    if (h5pIframe) {
      const h5pIframeInstance = (h5pIframe.contentWindow as any).H5P;
      console.log("H5P instance: ", h5pIframeInstance);

      const iframeVideo = h5pIframeInstance.instances[0].video
      iframeVideo.on("stateChange", (event) => {
        if ((event as { data: unknown }).data === 0) {
          console.log("Video finished");
          alert("Video finished")
        }
      })
    }

  }, [initialized])

  useEffect(() => {
    if (initialized) return;

    const el = h5pContainer.current;
    const options = {
      h5pJsonPath,
      ...(contentJsonPath && { contentJsonPath }),
      frameJs: "/assets/frame.bundle.js",
      frameCss: "/assets/styles/h5p.css",
      // Trigger API calls to the server.
      postUserStatistics: true,
      reportingIsEnabled: true,
      ajax: {
        setFinishedUrl: "http://localhost:3000/videos/finish",
      },
    };

    new H5P(el, options)
      .then((res: unknown) => {
        console.log(res);

        (window as any).H5P.externalDispatcher.on("xAPI", (event: unknown) => {
          console.log("xAPI event: ", event);
          setInitialized(true)
        });
      })
      .catch((e: unknown) => {
        console.log("Err: ", e);
      });
  }, [initialized, h5pJsonPath, h5pContainer, contentJsonPath]);

  return (
    <>
      <div ref={h5pContainer}></div>
    </>
  );
}

export default H5pPlayer;

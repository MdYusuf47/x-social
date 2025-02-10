"use client";

import { IKVideo } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

type videoType = {
  path: string;
  className?: string;
};

const Video = ({ path, className }: videoType) => {
  return (
    <IKVideo
      urlEndpoint={urlEndpoint}
      path={path}
      className={className}
      transformation={[{ width: "1920", height: "1080", q: "90" },{raw:"l-text,i-social,fs-100,co-white,l-end"}]}
      controls
    />
  );
};

export default Video;

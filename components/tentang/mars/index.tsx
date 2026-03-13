import React from "react";

import { PageContainer } from "@/components/layouts/PageContainer";
import { Card, CardContent } from "@/components/ui/card";

export default function MarsFeature() {
  return (
    <>
      <PageContainer className="max-w-4xl space-y-10">
        {/* Lyrics Image */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-6 text-center">
              Lirik Mars STTB
            </h2>

            <div className="flex justify-center">
              <img
                src="/images/misc/notMusic.png"
                alt="Lirik Mars STTB"
                className="rounded-lg shadow-md max-w-full h-auto"
              />
            </div>
          </CardContent>
        </Card>
        {/* Music Player */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Dengarkan Mars STTB
            </h2>

            <audio controls className="w-full">
              <source src="/audio/mars-sttb.mp3" type="audio/mpeg" />
              Browser Anda tidak mendukung audio player.
            </audio>
          </CardContent>
        </Card>
      </PageContainer>
    </>
  );
}

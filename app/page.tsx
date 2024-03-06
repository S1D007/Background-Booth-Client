"use client";
import { Result } from "@/components/page/Result";
import SelectBackgroundImage from "@/components/page/SelectBackgroundImage";
import SelectSubjectPictureImage from "@/components/page/SelectSubjectPictureImage";
import SelectTemplateImage from "@/components/page/SelectTemplateImage";
import { ModeToggle } from "@/components/theme-mode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useStore } from "@/zustand/useStore";

export default function Page() {
  const { loading } = useStore();
  return (
    <div className="flex flex-col">
      {loading && (
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <h1 className="text-2xl font-black">Processing...</h1>
        </div>
      )}
      <div className="flex flex-row p-2 h-screen">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex-1 rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50}>
                <SelectBackgroundImage />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <SelectTemplateImage />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <SelectSubjectPictureImage />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
